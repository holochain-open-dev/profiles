import { HodCreateProfileForm } from './elements/hod-create-profile-form';
import { HodProfilePrompt } from './elements/hod-profile-prompt';
import { HodSearchAgent } from './elements/hod-search-agent';
import { setupApolloClientElement } from '@holochain-open-dev/common';
export function setupProfileElements(dependencies) {
    const create = setupApolloClientElement(HodCreateProfileForm, dependencies.apolloClient);
    const prompt = setupApolloClientElement(HodProfilePrompt, dependencies.apolloClient);
    const search = setupApolloClientElement(HodSearchAgent, dependencies.apolloClient);
    return {
        'hod-create-profile-form': create,
        'hod-profile-prompt': prompt,
        'hod-search-agent': search,
    };
}
//# sourceMappingURL=setup-elements.js.map