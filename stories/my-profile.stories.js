import { html } from "lit-html";
import "@holochain-open-dev/profiles/dist/elements/my-profile.js";
import "@holochain-open-dev/profiles/dist/elements/profile-prompt.js";
import "@holochain-open-dev/profiles/dist/elements/profiles-context.js";
import { decodeHashFromBase64 } from "@holochain/client";
import {
  ProfilesZomeMock,
  demoProfiles,
} from "@holochain-open-dev/profiles/dist/mocks.js";
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

const mock = new ProfilesZomeMock(
  await demoProfiles(),
  decodeHashFromBase64("uhCAk8OKb2hznzG023xxh_vR3Q7Y4IEOAo4B0QN7ZhbGYeww")
);

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/my-profile",
  tags: ["autodocs"],
  component: "my-profile",
  render: (args) =>
    html` <profiles-context
      .store=${new ProfilesStore(new ProfilesClient(mock))}
    >
      <my-profile></my-profile>
    </profiles-context>`,
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};
