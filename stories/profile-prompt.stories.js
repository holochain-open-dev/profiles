import { html } from "lit-html";
import "@holochain-open-dev/profiles/profile-prompt";
import "@holochain-open-dev/profiles/profiles-context";
import { ProfilesZomeMock } from "@holochain-open-dev/profiles/mocks";
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/web-components/writing-stories/introduction
export default {
  title: "Frontend/Elements/profile-prompt",
  tags: ["autodocs"],
  component: "profile-prompt",
  render: (args) =>
    html` <profiles-context
      .store=${new ProfilesStore(
        new ProfilesClient(new ProfilesZomeMock(), "lobby")
      )}
    >
      <profile-prompt
        >You have successfully created your profile! Now the application
        elements should appear here. Click "Show code" to see how you can
        include your elements.</profile-prompt
      ></profiles-context
    >`,
  argTypes: {
    // backgroundColor: { control: 'color' },
    // onClick: { action: 'onClick' },
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/web-components/writing-stories/args
export const Demo = {};
