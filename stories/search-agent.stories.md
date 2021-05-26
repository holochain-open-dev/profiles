```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';

export default {
  title: 'HodSearchAgent',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: {
    component: 'hod-search-agent',
    options: { selectedPanel: 'storybookjs/knobs/panel' },
  },
};
```

# `<hod-search-agent>`

Search box to search and pick an agent from all created profiles.

## Features

- Automatic filtering and searching of all the agents who have created a profile in the current DNA.
- 3 characters are required for the search to occur.
- Fires an event when the user selects an agent

## API

<sb-props of="hod-search-agent"></sb-props>

### Installation & Usage

Please note that this custom element needs to be installed together with all the other elements of the `ProfilesModule`. Go to [https://github.com/holochain-open-dev/profiles-module](https://github.com/holochain-open-dev/profiles-module) for installation instructions.

After having installed the `ProfilesModule`, just add the element to your html:

```html
<body>
  <hod-search-agent> </hod-search-agent>
</body>
```

### Variants

```js preview-story
export const Default = () =>
  html` <hod-search-agent style="margin: 20px;"> </hod-search-agent> `;
```
