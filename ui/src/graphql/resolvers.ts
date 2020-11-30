import { AppWebsocket, CellId, AgentPubKey } from '@holochain/conductor-api';
import { Resolvers } from '@apollo/client/core';
import { Profile } from '../types';

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
        return agentProfile
          ? backendFormToProfile(agentProfile.profile)
          : undefined;
      },
    },
    Query: {
      async profilesSearch(_, { usernamePrefix }) {
        const start = Date.now();
        const allAgents = await callZome('search_profiles', {
          username_prefix: usernamePrefix,
        });
        console.log(Date.now() - start);
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
