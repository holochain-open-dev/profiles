import { SlTextareaProsemirror } from '@holochain-open-dev/elements/dist/elements/sl-textarea-prosemirror.js';
import {
	getCellIdFromRoleName,
	joinHrlString,
	splitHrlString,
} from '@holochain-open-dev/utils';
import { DnaHash, encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { NodeSpec, Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import './agent-mention.js';
import { SearchAgentDropdown } from './search-agent-dropdown.js';

export const agentMentionSpec: NodeSpec = {
	attrs: { agentPubKey: {} },
	inline: true,
	group: 'inline',
	draggable: true,
	toDOM: node => {
		console.log(node);
		return [
			'agent-mention',
			{ 'agent-pub-key': encodeHashToBase64(node.attrs.agentPubKey) },
		];
	},
	parseDOM: [{ tag: 'agent-mention' }],
};

export type SearchAgentPluginState =
	| {
			dropdownEl: SearchAgentDropdown;
			mentionCharIndex: number;
			lastCharIndex: number;
	  }
	| 'hidden';
const schema = new Schema({
	nodes: {
		doc: { content: 'paragraph+' },
		paragraph: {
			content: '(text|agentMention)*',
			toDOM() {
				return ['p', 0];
			},
		},
		text: {},
		agentMention: agentMentionSpec,
	},
});
const agentType = schema.nodes.agentMention;

export const pluginKey = new PluginKey('search-agent');
export const searchAgentPlugin = new Plugin<SearchAgentPluginState>({
	key: pluginKey,
	state: {
		init() {
			return 'hidden';
		},
		apply(tr, state) {
			const newPluginState = tr.getMeta(pluginKey);
			return newPluginState ? newPluginState : state;
		},
	},
	props: {
		handleKeyDown(view, event) {
			const state = this.getState(view.state);
			if (state && state !== 'hidden' && event.key === 'ArrowDown') {
				state.dropdownEl.dropdown.handleTriggerKeyDown(event);
			}
		},
		handleTextInput(view, _from, to, text) {
			const state = this.getState(view.state);
			console.log(state);

			if (state && state !== 'hidden') {
				setTimeout(() => {
					state.dropdownEl.searchFilter = view.state.doc.textBetween(
						state.mentionCharIndex + 1,
						to + 1,
					);
					view.dispatch(
						view.state.tr.setMeta(pluginKey, {
							...state,
							lastCharIndex: to,
						}),
					);
				});
			} else if (text === '@') {
				const { top, left } = view.coordsAtPos(to);
				const dropdownEl = document.createElement(
					'search-agent-dropdown',
				) as SearchAgentDropdown;

				dropdownEl.innerHTML = `<div style="position: fixed; height: 24px; top: ${top}px; left: ${left}px"></div>`;
				dropdownEl.open = true;
				view.dom.getRootNode().appendChild(dropdownEl);

				view.dispatch(
					view.state.tr.setMeta(pluginKey, {
						dropdownEl,
						mentionCharIndex: to,
						lastCharIndex: to,
					}),
				);

				dropdownEl.addEventListener('agent-selected', (e: any) => {
					const agentPubKey = e.detail.agentPubKey;
					const state = this.getState(view.state);

					if (!state || state === 'hidden') return;

					const tr = view.state.tr;

					tr.replaceRangeWith(
						state.mentionCharIndex,
						state.lastCharIndex + 1,
						agentType.create({
							agentPubKey,
						}),
					);

					view.dom.getRootNode().removeChild(dropdownEl);
					view.dispatch(tr.setMeta(pluginKey, 'hidden'));
				});

				dropdownEl.addEventListener('sl-hide', () =>
					setTimeout(() => {
						view.dom.getRootNode().removeChild(dropdownEl);
						view.dispatch(view.state.tr.setMeta(pluginKey, 'hidden'));
					}, 10),
				);
			}
		},
	},
});

// export class SearchAgentModule {
//   dropdownEl: SearchAgentDropdown | undefined;
//   mentionCharIndex: number | undefined;
//   lastCharIndex: number | undefined;

//   constructor(protected quill: Quill) {
//     console.log(quill);
//     quill.container.addEventListener("keydown", (e: KeyboardEvent) => {
//       if (this.dropdownEl) {
//         this.dropdownEl!.dropdown.handleTriggerKeyDown(e);
//       }
//     });
//     quill.on("text-change", (delta: any) => {
//       const insertOneLetter =
//         delta.ops.length > 0 && "insert" in delta.ops[delta.ops.length - 1];

//       if (!insertOneLetter) return;

//       const cursorPosition = "retain" in delta.ops[0] ? delta.ops[0].retain : 0;

//       if (this.dropdownEl) {
//         let searchFilter: string = quill.getText(
//           this.mentionCharIndex! + 1,
//           cursorPosition
//         );
//         if (searchFilter.endsWith("\n")) {
//           searchFilter = searchFilter.slice(0, searchFilter.length - 1);
//         }

//         this.lastCharIndex = cursorPosition;
//         this.dropdownEl.searchFilter = searchFilter;
//       } else if (delta.ops[delta.ops.length - 1].insert === "@") {
//         this.mentionCharIndex = cursorPosition;
//         this.lastCharIndex = this.mentionCharIndex;

//         const containerPos = quill.container.getBoundingClientRect();
//         const mentionCharPos = quill.getBounds(this.mentionCharIndex);
//         const mentionCharPosAbsolute = {
//           left: containerPos.left + mentionCharPos.left,
//           top: containerPos.top + mentionCharPos.top,
//         };

//         this.dropdownEl = document.createElement(
//           "search-agent-dropdown"
//         ) as SearchAgentDropdown;
//         this.dropdownEl.innerHTML = `<div style="position: fixed; height: 24px; top: ${mentionCharPosAbsolute.top}px; left: ${mentionCharPosAbsolute.left}px"></div>`;
//         this.dropdownEl.open = true;
//         this.dropdownEl.includeMyself = true;

//         this.dropdownEl.addEventListener("sl-hide", () =>
//           setTimeout(() => this.removeDropdown(), 10)
//         );
//         this.dropdownEl.addEventListener("agent-selected", (e) => {
//           const index = this.mentionCharIndex;
//           const length = this.lastCharIndex! - this.mentionCharIndex!;
//           this.removeDropdown();
//           this.quill.deleteText(index!, length + 1, "api");
//           this.quill.insertEmbed(
//             index,
//             "agent-mention",
//             (e as any).detail.agentPubKey,
//             "api"
//           );
//           this.quill.insertText(index! + 1, " ");
//           setTimeout(() => {
//             this.quill.focus();
//             this.quill.setSelection(index! + 1, 0, "api");
//           }, 1000);
//         });

//         quill.container.appendChild(this.dropdownEl);
//       }
//     });
//   }

//   removeDropdown() {
//     if (!this.dropdownEl) return;
//     this.quill.container.removeChild(this.dropdownEl);
//     this.dropdownEl = undefined;
//     this.mentionCharIndex = undefined;
//     this.lastCharIndex = undefined;
//   }

//   detach() {
//     this.removeDropdown();
//   }
// }

// Quill.register("modules/search-agent", SearchAgentModule);

@localized()
@customElement('textarea-with-mentions')
export class TextareaWithMentions extends SlTextareaProsemirror {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	dnaHash!: DnaHash;

	async firstUpdated() {
		super.firstUpdated();
		const appInfo = await this.store.client.client.appInfo();
		if (!appInfo) throw new Error('Appinfo is null.');
		const cellId = getCellIdFromRoleName(this.store.client.roleName, appInfo);
		this.dnaHash = cellId[0];
	}

	@property()
	helpText: string = msg("Press '@' to mention an agent.");

	get value() {
		if (!this.input?.quill) return '';
		const contents = this.input.quill.getContents();

		const array = contents.ops.map((delta: any) => {
			if (typeof delta.insert === 'string') {
				return delta.insert;
			} else {
				return [this.dnaHash, delta.insert['agent-mention']];
			}
		});

		const text = joinHrlString(array);

		return text.slice(0, text.length - 1); // Slice to remove the newline
	}

	set value(v: string) {
		if (!this.input?.quill) return;
		const array = splitHrlString(v);

		const ops = array.map(hrlOrString => {
			if (typeof hrlOrString === 'string') {
				return {
					insert: hrlOrString,
				};
			} else {
				return {
					insert: {
						'agent-mention': hrlOrString[1],
					},
				};
			}
		});
		this.input.quill.setContents(ops);
	}

	editorStateConfig() {
		return {
			schema,
			plugins: [keymap(baseKeymap), searchAgentPlugin],
		};
	}
}
