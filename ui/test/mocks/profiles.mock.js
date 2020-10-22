import { randomHash, hashToString } from 'holochain-ui-test-utils';

export class ProfilesMock {
  constructor() {
    this.agents = [];
  }

  create_profile({ username }, provenance) {
    this.agents.push({
      agent_id: provenance,
      profile: { username },
    });

    return hashToString(provenance);
  }

  get_all_profiles() {
    return this.agents.map(a => ({ agent_id: hashToString(a.agent_id), ...a }));
  }

  get_my_profile(_, provenance) {
    const agent = this.findAgent(hashToString(provenance));

    if (!agent)
      return {
        agent_id: hashToString(provenance),
      };
    return {
      agent_id: hashToString(agent.agent_id),
      profile: agent ? agent.profile : undefined,
    };
  }

  findAgent(agent_address) {
    return this.agents.find(
      user => hashToString(user.agent_id) === agent_address
    );
  }

  get_agent_profile({ agent_address }) {
    const agent = this.findAgent(agent_address);
    return agent ? agent.username : undefined;
  }
}
