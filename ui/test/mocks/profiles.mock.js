import { randomHash, hashToString } from 'holochain-ui-test-utils';

export class ProfilesMock {
  constructor() {
    this.agents = [];
  }

  create_profile({ username }, provenance) {
    const agent = {
      agent_pub_key: hashToString(provenance),
      profile: { username },
    };
    this.agents.push(agent);

    return agent;
  }

  get_all_profiles() {
    return this.agents.map(a => ({
      agent_pub_key: a.agent_pub_key,
      ...a,
    }));
  }

  get_my_profile(_, provenance) {
    const agent = this.findAgent(hashToString(provenance));

    if (!agent)
      return {
        agent_pub_key: provenance,
      };
    return {
      agent_pub_key: agent.agent_pub_key,
      profile: agent ? agent.profile : undefined,
    };
  }

  get_agent_profile({ agent_address }) {
    const agent = this.findAgent(agent_address);
    return agent ? agent.username : undefined;
  }

  findAgent(agent_address) {
    return this.agents.find(user => user.agent_pub_key === agent_address);
  }
}
