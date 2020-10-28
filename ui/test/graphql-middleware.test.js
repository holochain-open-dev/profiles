import { expect } from '@open-wc/testing';
import { SEARCH_PROFILES, CREATE_PROFILE, GET_MY_PROFILE } from '../dist';

import { setupApolloClientMock } from './mocks';

describe('Apollo middleware', () => {
  it('set a username and retrieve all users', async () => {
    const client = await setupApolloClientMock();

    const createProfileResult = await client.mutate({
      mutation: CREATE_PROFILE,
      variables: {
        username: 'alice',
      },
    });

    const myProfile = await client.query({
      query: GET_MY_PROFILE,
    });
    expect(myProfile.data.me.profile.username).to.equal('alice');

    let result = await client.query({
      query: SEARCH_PROFILES,
      variables: {
        usernamePrefix: 'were'
      }
    });
    expect(result.data.searchProfiles.length).to.equal(0);

    result = await client.query({
      query: SEARCH_PROFILES,
      variables: {
        usernamePrefix: 'ali'
      }
    });
    expect(result.data.searchProfiles.length).to.equal(1);
    expect(result.data.searchProfiles[0].profile.username).to.equal('alice');

  });
});
