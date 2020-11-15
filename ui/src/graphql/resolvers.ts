import { AppWebsocket, CellId, AgentPubKey } from '@holochain/conductor-api';
import { Resolvers } from '@apollo/client/core';
import { Profile } from '../types';

function hashToString(hash: AgentPubKey) {
  return hash.hash_type.toString('hex') + hash.hash.toString('hex');
}

interface ProfileBackendForm {
  username: string;
  fields: any;
}

function backendFormToProfile(p: ProfileBackendForm): Profile & any {
  return {
    username: p.username,
    ...p.fields,
  };
}

function profileToBackendForm(profile: Profile & any): ProfileBackendForm {
  const fields = Object.keys(profile).filter(key => key !== 'username');

  const fieldsObject = fields.reduce(
    (acc, next) => ({ ...acc, [next]: profile[next] }),
    {}
  );

  return {
    username: profile.username,
    fields: fieldsObject,
  };
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

        const agentProfile = await callZome('get_agent_profile', parent.id);
        return backendFormToProfile(agentProfile.profile)
      },
    },
    Query: {
      async searchProfiles(_, { usernamePrefix }) {
        const allAgents = await callZome('search_profiles', {
          username_prefix: usernamePrefix,
        });
        return allAgents.map(
          (agent: {
            agent_pub_key: AgentPubKey;
            profile: ProfileBackendForm;
          }) => ({
            id: agent.agent_pub_key,
            profile: backendFormToProfile(agent.profile),
          })
        );
      },
      async me(_, __) {
        const profile = await callZome('get_my_profile', null);

        if (!profile) {
          const my_pub_key = await callZome('who_am_i', null);
          return { id: my_pub_key };
        }

        return {
          id: profile.agent_pub_key,
          profile: backendFormToProfile(profile.profile),
        };
      },
    },
    Mutation: {
      async createProfile(_, { profile }) {
        const profileResult = await callZome(
          'create_profile',
          profileToBackendForm(profile)
        );

        return {
          id: profileResult.agent_pub_key,
          profile: profileResult.profile,
        };
      },
    },
  };
}
