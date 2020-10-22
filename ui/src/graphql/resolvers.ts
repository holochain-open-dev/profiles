import { AppWebsocket, CellId, AgentPubKey } from '@holochain/conductor-api';
import { Resolvers } from '@apollo/client/core';
import { Profile } from '../types';

function hashToString(hash: AgentPubKey) {
  return hash.hash_type.toString('hex') + hash.hash.toString('hex');
}

export function profilesResolvers(
  appWebsocket: AppWebsocket,
  cellId: CellId,
  zomeName = 'profiles'
): Resolvers {
  function callZome(fn_name: string, payload: any) {
    return appWebsocket.callZome({
      cap: null as any,
      cell_id: cellId,
      zome_name: zomeName,
      fn_name: fn_name,
      payload: payload,
      provenance: cellId[1],
    });
  }

  return {
    Agent: {
      async profile(parent) {
        if (parent.profile) return parent.profile;

        return callZome('get_agent_profile', { agent_address: parent.id });
      },
    },
    Query: {
      async allAgents(_, __) {
        const allAgents = await callZome('get_all_profiles', null);
        return allAgents.map(
          (agent: { agent_pub_key: AgentPubKey; profile: Profile }) => ({
            id: agent.agent_pub_key,
            profile: agent.profile,
          })
        );
      },
      async me(_, __) {
        const profile = await callZome('get_my_profile', null);

        return {
          id: profile.agent_pub_key,
          profile: profile.profile,
        };
      },
    },
    Mutation: {
      async createProfile(_, { username }) {
        const profile = await callZome('create_profile', {
          username,
        });
        console.log(profile)

        return {
          id: profile.agent_pub_key,
          profile: {
            username,
          },
        };
      },
    },
  };
}
