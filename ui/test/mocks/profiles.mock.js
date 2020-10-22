import { randomHash, hashToString } from 'holochain-ui-test-utils';

export class ProfilesMock {
  constructor() {
    this.agents = [];
  }

  create_profile({ username }, provenance) {
    this.agents.push({
      agent_pub_key: provenance,
      profile: { username },
    });

    return hashToString(provenance);
  }

  get_all_profiles() {
    return this.agents.map(a => ({ agent_pub_key: hashToString(a.agent_pub_key), ...a }));
  }

  get_my_profile(_, provenance) {
    const agent = this.findAgent(hashToString(provenance));

    if (!agent)
      return {
        agent_pub_key: hashToString(provenance),
      };
    return {
      agent_pub_key: hashToString(agent.agent_pub_key),
      profile: agent ? agent.profile : undefined,
    };
  }

  get_agent_profile({ agent_address }) {
    const agent = this.findAgent(agent_address);
    return agent ? agent.username : undefined;
  }
  
  findAgent(agent_address) {
    return this.agents.find(
      user => hashToString(user.agent_pub_key) === agent_address
    );
  }
}
