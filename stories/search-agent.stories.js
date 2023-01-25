import { html } from "lit-html";
import "@holochain-open-dev/profiles/search-agent";
import "@holochain-open-dev/profiles/profiles-context";
import { ProfilesZomeMock } from "@holochain-open-dev/profiles/mocks";
import {
  ProfilesStore,
  ProfilesClient,
  ProfilePrompt,
  SearchAgent,
} from "@holochain-open-dev/profiles";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/search-agent",
  tags: ["autodocs"],
  component: "search-agent",
  render: (args) =>
    html` <profiles-context
      .store=${new ProfilesStore(new ProfilesClient(new ProfilesZomeMock()))}
      ><div style="height: 200px"><search-agent></search-agent></div
    ></profiles-context>`,
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};

// export const Secondary = {
//   args: {
//     label: "Button",
//   },
// };

// export const Large = {
//   args: {
//     size: "large",
//     label: "Button",
//   },
// };

// export const Small = {
//   args: {
//     size: "small",
//     label: "Button",
//   },
// };
