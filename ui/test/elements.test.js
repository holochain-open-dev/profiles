import { html, fixture, expect } from '@open-wc/testing';
import { setupApolloClientMock } from './mocks';
import { HodCreateProfileForm } from '../dist';
import { setupApolloClientElement } from '@holochain-open-dev/common';

describe('HodCreateProfileForm', () => {
  it('create profile has a placeholder', async () => {
    const client = await setupApolloClientMock();

    customElements.define(
      'hod-create-profile-form',
      setupApolloClientElement(HodCreateProfileForm, client)
    );

    const el = await fixture(
      html` <hod-create-profile-form></hod-create-profile-form> `
    );

    expect(el.shadowRoot.innerHTML).to.include('CREATE PROFILE');
  });
});
