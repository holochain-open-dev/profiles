import { expect } from '@open-wc/testing';
import { GET_ALL_AGENTS, CREATE_PROFILE, GET_MY_PROFILE } from '../dist';

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

    /* 
    const myProfile = await client.query({
      query: GET_MY_PROFILE,
    });
    expect(myProfile.data.me.profile.username).to.equal('alice');

    const result = await client.query({
      query: GET_ALL_AGENTS,
    });
    expect(result.data.allAgents.length).to.equal(1);
    expect(result.data.allAgents[0].profile.username).to.equal('alice');
    const myProfileResult = await client.query({
      query: GET_MY_PROFILE,
    });
    expect(myProfileResult.data.me.profile.username).to.equal('alice'); */
  });
});
