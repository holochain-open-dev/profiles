import { html } from "lit-html";
import "@holochain-open-dev/profiles/dist/elements/profile-detail.js";
import "@holochain-open-dev/profiles/dist/elements/profiles-context.js";
import { ProfilesZomeMock } from "@holochain-open-dev/profiles/dist/mocks.js";
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

const mock = new ProfilesZomeMock();

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/profile-detail",
  tags: ["autodocs"],
  component: "profile-detail",
  render: (args) =>
    html` <profiles-context
      .store=${new ProfilesStore(new ProfilesClient(mock))}
    >
      <profile-detail
        .agentPubKey=${Array.from(mock.agentsProfiles.keys())[0]}
      />
    </profiles-context>`,
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};
