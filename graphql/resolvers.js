function hashToString(hash) {
    return hash.hash_type.toString('hex') + hash.hash.toString('hex');
}
export function profilesResolvers(appWebsocket, cellId, zomeName = 'profiles') {
    function callZome(fn_name, payload) {
        return appWebsocket.callZome({
            cap: null,
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
                if (parent.profile)
                    return parent.profile;
                return callZome('get_agent_profile', parent.id);
            },
        },
        Query: {
            async searchProfiles(_, { usernamePrefix }) {
                const allAgents = await callZome('search_profiles', {
                    username_prefix: usernamePrefix,
                });
                return allAgents.map((agent) => ({
                    id: agent.agent_pub_key,
                    profile: agent.profile,
                }));
            },
            async me(_, __) {
                const profile = await callZome('get_my_profile', null);
                if (!profile) {
                    const my_pub_key = await callZome('who_am_i', null);
                    return { id: my_pub_key };
                }
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
//# sourceMappingURL=resolvers.js.map