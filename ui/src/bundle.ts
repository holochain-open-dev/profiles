import { Lenses } from '@compository/lib';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { MembraneContextProvider } from '@holochain-open-dev/membrane-context';
import { Constructor } from 'lit-element';
//@ts-ignore
import { createUniqueTag } from '@open-wc/scoped-elements/src/createUniqueTag';
import { HodListProfiles } from './elements/hod-list-profiles';

function renderUnique(
  tag: string,
  baseClass: Constructor<HTMLElement>,
  root: ShadowRoot,
  appWebsocket: AppWebsocket,
  cellId: CellId
) {
  const registry = customElements;
  const uniqueTag = createUniqueTag(tag, registry);
  const holochainMembraneTag = createUniqueTag(
    'membrane-context-provider',
    registry
  );
  registry.define(
    holochainMembraneTag,
    (class extends MembraneContextProvider {} as unknown) as Constructor<HTMLElement>
  );
  root.innerHTML = `
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
          <${holochainMembraneTag} id="context">
            <${uniqueTag}></${uniqueTag}>
          </${holochainMembraneTag}>
      `;

  const context: MembraneContextProvider = (root.getElementById(
    'context'
  ) as unknown) as MembraneContextProvider;
  context.appWebsocket = appWebsocket;
  context.cellId = cellId;

  registry.define(
    uniqueTag,
    (class extends baseClass {} as unknown) as Constructor<HTMLElement>
  );
}

const renderers: Lenses = {
  standalone: [
    {
      name: 'List Profiles',
      render(root: ShadowRoot, appWebsocket: AppWebsocket, cellId: CellId) {
        renderUnique(
          'list-profiles',
          HodListProfiles,
          root,
          appWebsocket,
          cellId
        );
      },
    },
  ],
  entryLenses: {},
  attachmentsLenses: [],
};

export default renderers;
