import { CellClient } from '@holochain-open-dev/cell-client';
import { deserializeHash, serializeHash, } from '@holochain-open-dev/core-types';
const sleep = (ms) => new Promise(r => setTimeout(() => r(null), ms));
export class ProfilesZomeMock extends CellClient {
    constructor(agents = [], latency = 500) {
        super(null, null);
        this.agents = agents;
        this.latency = latency;
    }
    get cellId() {
        return [
            deserializeHash('uhC0kkSpFl08_2D0Pvw2vEVEkfSgDVZCkyOf1je6qIdClO1o'),
            deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI'),
        ];
    }
    get myPubKeyB64() {
        return serializeHash(this.cellId[1]);
    }
    create_profile({ nickname }) {
        const agent = {
            agentPubKey: this.myPubKeyB64,
            profile: { nickname, fields: {} },
        };
        this.agents.push(agent);
        return agent;
    }
    search_profiles({ nicknamePrefix }) {
        return this.agents.filter(a => a.profile.nickname.startsWith(nicknamePrefix.slice(0, 3)));
    }
    get_my_profile() {
        const agent = this.findAgent(this.myPubKeyB64);
        if (!agent)
            return undefined;
        return {
            agentPubKey: agent.agentPubKey,
            profile: agent ? agent.profile : undefined,
        };
    }
    get_agent_profile(agent_address) {
        const agent = this.findAgent(agent_address);
        return agent ? agent : undefined;
    }
    get_all_profiles() {
        return this.agents;
    }
    findAgent(agent_address) {
        return this.agents.find(user => user.agentPubKey === agent_address);
    }
    async callZome(zomeName, fnName, payload, timeout) {
        await sleep(this.latency);
        return this[fnName](payload);
    }
    addSignalHandler(signalHandler) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=mocks.js.map