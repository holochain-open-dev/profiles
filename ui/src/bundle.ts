import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { Constructor } from 'lit-element';
//@ts-ignore
import { createUniqueTag } from '@open-wc/scoped-elements/src/createUniqueTag';
import { ListProfiles } from './elements/list-profiles';
import { ProfilesService } from './profiles.service';
import { ProfilesStore } from './profiles.store';
import { connectStore } from '@holochain-open-dev/common';

function renderUnique(
  tag: string,
  baseClass: Constructor<HTMLElement>,
  root: ShadowRoot
) {
  const registry = customElements;
  const uniqueTag = createUniqueTag(tag, registry);
  root.innerHTML = `
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
            <${uniqueTag}></${uniqueTag}>
      `;

  registry.define(
    uniqueTag,
    (class extends baseClass {} as unknown) as Constructor<HTMLElement>
  );
}

export default function lenses(appWebsocket: AppWebsocket, cellId: CellId) {
  const profilesService = new ProfilesService(appWebsocket, cellId);
  const store = new ProfilesStore(profilesService);

  return {
    standalone: [
      {
        name: 'List Profiles',
        render(root: ShadowRoot) {
          renderUnique('list-profiles', connectStore(ListProfiles, store), root);
        },
      },
    ],
    entryLenses: {},
    attachmentsLenses: [],
  };
}
