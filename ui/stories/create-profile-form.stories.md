```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';
import { ProfilesModule } from '../dist';
import { setupApolloClientMock } from '../test/mocks';

setupApolloClientMock().then(client =>
  new ProfilesModule({ apolloClient: client }).install()
);

export default {
  title: 'HodCreateProfileForm',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: {
    component: 'hod-create-profile-form',
    options: { selectedPanel: 'storybookjs/knobs/panel' },
  },
};
```

# `<hod-create-profile-form>`

Form to create the profile for your holochain application.

## Features

- Checks that the username is longer than a given minimum length
- Sets the username for the user entering the application
- Setting the username fails if the username was already created by another agent

## API

<sb-props of="hod-create-profile-form"></sb-props>

### Installation & Usage

Please note that this custom element needs to be installed together with all the other elements of the `ProfilesModule`. Go to [https://github.com/holochain-open-dev/profiles-module](https://github.com/holochain-open-dev/profiles-module) for installation instructions.

After having installed the `ProfilesModule`, just add the element to your html:

```html
<body>
  <hod-create-profile-form></hod-create-profile-form>
</body>
```

### Variants

```js preview-story
export const Default = () =>
  html`
    <div style="height: 200px; width: 300px; padding: 16px;">
      <hod-create-profile-form></hod-create-profile-form>
    </div>
  `;
```

```js preview-story
export const MinimumLength = () => {
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(Date.now() / 1000) + 3600;
  return html`
    <div style="height: 200px; width: 300px; padding: 16px;">
      <hod-create-profile-form .minLength=${5}></hod-create-profile-form>
    </div>
  `;
};
```
