import { customElement, property } from "lit/decorators.js";
import { SlQuill } from "@holochain-open-dev/elements/dist/elements/sl-quill.js";
import { Quill } from "@scoped-elements/quill";

import "./search-agent-dropdown.js";
import { SearchAgentDropdown } from "./search-agent-dropdown.js";
import { AgentPubKey, DnaHash } from "@holochain/client";
import { AgentMention } from "./agent-mention.js";
import "./agent-mention.js";
import { consume } from "@lit-labs/context";
import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";
import { localized, msg } from "@lit/localize";
import {
  getCellIdFromRoleName,
  joinHrlString,
  splitHrlString,
} from "@holochain-open-dev/utils";

const Embed = Quill.import("blots/embed");

export class AgentEmbed extends Embed {
  static create(data: AgentPubKey) {
    const el = super.create() as AgentMention;
    el.agentPubKey = data;
    return el;
  }
  static value(domNode: AgentMention) {
    return domNode.agentPubKey;
  }
  static blotName = "agent-mention";
  static tagName = "agent-mention";
}
Quill.register(AgentEmbed);

export class SearchAgentModule {
  dropdownEl: SearchAgentDropdown | undefined;
  mentionCharIndex: number | undefined;
  lastCharIndex: number | undefined;

  constructor(protected quill: Quill) {
    console.log(quill);
    quill.container.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.dropdownEl) {
        this.dropdownEl!.dropdown.handleTriggerKeyDown(e);
      }
    });
    quill.on("text-change", (delta: any) => {
      const insertOneLetter =
        delta.ops.length > 0 && "insert" in delta.ops[delta.ops.length - 1];

      if (!insertOneLetter) return;

      const cursorPosition = "retain" in delta.ops[0] ? delta.ops[0].retain : 0;

      if (this.dropdownEl) {
        let searchFilter: string = quill.getText(
          this.mentionCharIndex! + 1,
          cursorPosition
        );
        if (searchFilter.endsWith("\n")) {
          searchFilter = searchFilter.slice(0, searchFilter.length - 1);
        }

        this.lastCharIndex = cursorPosition;
        this.dropdownEl.searchFilter = searchFilter;
      } else if (delta.ops[delta.ops.length - 1].insert === "@") {
        this.mentionCharIndex = cursorPosition;
        this.lastCharIndex = this.mentionCharIndex;

        const containerPos = quill.container.getBoundingClientRect();
        const mentionCharPos = quill.getBounds(this.mentionCharIndex);
        const mentionCharPosAbsolute = {
          left: containerPos.left + mentionCharPos.left,
          top: containerPos.top + mentionCharPos.top,
        };

        this.dropdownEl = document.createElement(
          "search-agent-dropdown"
        ) as SearchAgentDropdown;
        this.dropdownEl.innerHTML = `<div style="position: fixed; height: 24px; top: ${mentionCharPosAbsolute.top}px; left: ${mentionCharPosAbsolute.left}px"></div>`;
        this.dropdownEl.open = true;
        this.dropdownEl.includeMyself = true;

        this.dropdownEl.addEventListener("sl-hide", () =>
          setTimeout(() => this.removeDropdown(), 10)
        );
        this.dropdownEl.addEventListener("agent-selected", (e) => {
          const index = this.mentionCharIndex;
          const length = this.lastCharIndex! - this.mentionCharIndex!;
          this.removeDropdown();
          this.quill.deleteText(index!, length + 1, "api");
          this.quill.insertEmbed(
            index,
            "agent-mention",
            (e as any).detail.agentPubKey,
            "api"
          );
          this.quill.insertText(index! + 1, " ");
          setTimeout(() => {
            this.quill.focus();
            this.quill.setSelection(index! + 1, 0, "api");
          }, 1000);
        });

        quill.container.appendChild(this.dropdownEl);
      }
    });
  }

  removeDropdown() {
    if (!this.dropdownEl) return;
    this.quill.container.removeChild(this.dropdownEl);
    this.dropdownEl = undefined;
    this.mentionCharIndex = undefined;
    this.lastCharIndex = undefined;
  }

  detach() {
    this.removeDropdown();
  }
}

Quill.register("modules/search-agent", SearchAgentModule);

@localized()
@customElement("textarea-with-mentions")
export class TextareaWithMentions extends SlQuill {
  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  dnaHash!: DnaHash;

  async firstUpdated() {
    const appInfo = await this.store.client.client.appInfo();

    const cellId = getCellIdFromRoleName(this.store.client.roleName, appInfo);
    this.dnaHash = cellId[0];
  }

  @property()
  helpText: string = msg("Press '@' to mention an agent.");

  get value() {
    if (!this.input?.quill) return "";
    const contents = this.input.quill.getContents();

    const array = contents.ops.map((delta: any) => {
      if (typeof delta.insert === "string") {
        return delta.insert;
      } else {
        return [this.dnaHash, delta.insert["agent-mention"]];
      }
    });

    const text = joinHrlString(array);

    return text.slice(0, text.length - 1); // Slice to remove the newline
  }

  set value(v: string) {
    if (!this.input?.quill) return;
    const array = splitHrlString(v);

    const ops = array.map((hrlOrString) => {
      if (typeof hrlOrString === "string") {
        return {
          insert: hrlOrString,
        };
      } else {
        return {
          insert: {
            "agent-mention": hrlOrString[1],
          },
        };
      }
    });
    this.input.quill.setContents(ops);
  }

  options() {
    return {
      placeholder: this.placeholder,
      modules: {
        "search-agent": true,
      },
    };
  }
}
