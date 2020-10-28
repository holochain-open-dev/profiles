import { ApolloClient } from '@apollo/client/core';
import { HodCreateProfileForm } from './elements/hod-create-profile-form';
import { HodProfilePrompt } from './elements/hod-profile-prompt';
import { HodSearchAgent } from './elements/hod-search-agent';
import { setupApolloClientElement } from './utils';

export class ProfilesModule {
  constructor(protected dependencies: { apolloClient: ApolloClient<any> }) {}

  async install(): Promise<void> {
    customElements.define(
      'hod-create-profile-form',
      setupApolloClientElement(
        HodCreateProfileForm,
        this.dependencies.apolloClient
      )
    );
    customElements.define(
      'hod-profile-prompt',
      setupApolloClientElement(HodProfilePrompt, this.dependencies.apolloClient)
    );
    customElements.define(
      'hod-search-agent',
      setupApolloClientElement(HodSearchAgent, this.dependencies.apolloClient)
    );
  }

  static isInstalled(): boolean {
    return customElements.get('hod-profile-prompt');
  }
}
