import { HodCreateProfileForm } from './elements/hod-create-profile-form';
import { HodProfilePrompt } from './elements/hod-profile-prompt';
import { HodSearchAgent } from './elements/hod-search-agent';
import { setupApolloClientElement } from './utils';
export class ProfilesModule {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }
    async install() {
        customElements.define('hod-create-profile-form', setupApolloClientElement(HodCreateProfileForm, this.dependencies.apolloClient));
        customElements.define('hod-profile-prompt', setupApolloClientElement(HodProfilePrompt, this.dependencies.apolloClient));
        customElements.define('hod-search-agent', setupApolloClientElement(HodSearchAgent, this.dependencies.apolloClient));
    }
    static isInstalled() {
        return customElements.get('hod-profile-prompt');
    }
}
//# sourceMappingURL=profiles.module.js.map