import { html } from "lit-html";
import "@holochain-open-dev/profiles/my-profile";
import "@holochain-open-dev/profiles/profile-prompt";
import "@holochain-open-dev/profiles/profiles-context";
import { ProfilesZomeMock } from "@holochain-open-dev/profiles/mocks";
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

const mock = new ProfilesZomeMock();

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/my-profile",
  tags: ["autodocs"],
  component: "my-profile",
  render: (args) =>
    html` <profiles-context
      .store=${new ProfilesStore(new ProfilesClient(mock))}
    >
      <profile-prompt> <my-profile /></profile-prompt>
    </profiles-context>`,
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};
