import { html, fixture, expect } from '@open-wc/testing';
import { setupApolloClientMock } from './mocks';
import { setupApolloClientElement, HodCreateProfileForm } from '../dist';

describe('HodCreateProfileForm', () => {
  it('set username has a placeholder', async () => {
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
