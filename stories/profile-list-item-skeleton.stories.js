import { html } from "lit-html";
import "@holochain-open-dev/profiles/profile-list-item-skeleton";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/profile-list-item-skeleton",
  tags: ["autodocs"],
  component: "profile-list-item-skeleton",
  render: (args) =>
    html`
      <profile-list-item-skeleton />
      <profile-list-item-skeleton />
      <profile-list-item-skeleton />
    `,
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};
