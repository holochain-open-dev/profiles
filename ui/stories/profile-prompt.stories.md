```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';

export default {
  title: 'HodProfilePrompt',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: {
    component: 'hod-profile-prompt',
    options: { selectedPanel: 'storybookjs/knobs/panel' },
  },
};
```

# `<hod-profile-prompt>`

Prompts the user with the `<hod-create-profile-form>` if they haven't created a profile yet in this DNA.

## Features

- Checks whether the current agent has already created a profile and:
  - If it has, it displays the contents of the element (this is where your web app content should be placed).
  - If it has not, it displays the form to create the profile.

## API

<sb-props of="hod-profile-prompt"></sb-props>

### Installation & Usage

Please note that this custom element needs to be installed together with all the other elements of the `ProfilesModule`. Go to [https://github.com/holochain-open-dev/profiles-module](https://github.com/holochain-open-dev/profiles-module) for installation instructions.

After having installed the `ProfilesModule`, just add the element to your html:

```html
<body>
  <hod-profile-prompt>
    <span>Here goes the real content for the application</span>
    <br />
    <span>
      It will only be displayed when the profile has already been created
    </span>
  </hod-profile-prompt>
</body>
```

### Variants

```js preview-story
export const Default = () =>
  html`
    <div style="width: 100%; height: 100%; display: flex;">
      <hod-profile-prompt style="flex: 1;">
        <span>Here goes the real content for the application</span>
        <br />
        <span>
          It will only be displayed when the profile has already been created
        </span>
      </hod-profile-prompt>
    </div>
  `;
```
