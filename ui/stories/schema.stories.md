```js script
export default {
  title: 'GraphQl Schema',
};
```

# GraphQl Schema included in the ProfilesModule

```js preview-story
import { html } from 'lit-html';
import { profilesTypeDefs } from '../dist';
import { print } from 'graphql/language/printer';

console.log(print(profilesTypeDefs));

export const Schema = () => html`<pre>${print(profilesTypeDefs)}</pre>`;
```
