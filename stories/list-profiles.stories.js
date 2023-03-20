import { html } from "lit-html";
import "@holochain-open-dev/profiles/elements/list-profiles.js";
import "@holochain-open-dev/profiles/elements/profiles-context.js";
import { ProfilesZomeMock } from "@holochain-open-dev/profiles/mocks";
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/list-profiles",
  tags: ["autodocs"],
  component: "list-profiles",
  render: (args) =>
    html` <profiles-context
      .store=${new ProfilesStore(new ProfilesClient(new ProfilesZomeMock()))}
    >
      <list-profiles />
    </profiles-context>`,
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};
