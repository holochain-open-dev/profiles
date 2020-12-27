import { MembraneContextProvider } from '@holochain-open-dev/membrane-context';
//@ts-ignore
import { createUniqueTag } from '@open-wc/scoped-elements/src/createUniqueTag';
import { HodListProfiles } from './elements/hod-list-profiles';
function renderUnique(tag, baseClass, root, appWebsocket, cellId) {
    const registry = customElements;
    const uniqueTag = createUniqueTag(tag, registry);
    const holochainMembraneTag = createUniqueTag('membrane-context-provider', registry);
    registry.define(holochainMembraneTag, class extends MembraneContextProvider {
    });
    root.innerHTML = `
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
          <${holochainMembraneTag} id="context">
            <${uniqueTag}></${uniqueTag}>
          </${holochainMembraneTag}>
      `;
    const context = root.getElementById('context');
    context.appWebsocket = appWebsocket;
    context.cellId = cellId;
    registry.define(uniqueTag, class extends baseClass {
    });
}
const renderers = {
    standalone: [
        {
            name: 'List Profiles',
            render(root, appWebsocket, cellId) {
                renderUnique('list-profiles', HodListProfiles, root, appWebsocket, cellId);
            },
        },
    ],
    entryLenses: {},
    attachmentsLenses: [],
};
export default renderers;
//# sourceMappingURL=bundle.js.map