import { CellClient } from '@holochain-open-dev/cell-client';
import { deserializeHash, } from '@holochain-open-dev/core-types';
import { fakeRecord, HoloHashMap } from '@holochain-open-dev/utils';
import { encode } from '@msgpack/msgpack';
const sleep = (ms) => new Promise(r => setTimeout(() => r(null), ms));
export class ProfilesZomeMock extends CellClient {
    constructor(agents = new HoloHashMap(), latency = 500) {
        super(null, {
            cell_id: [
                deserializeHash('uhC0kkSpFl08_2D0Pvw2vEVEkfSgDVZCkyOf1je6qIdClO1o'),
                deserializeHash('uhCAk6oBoqygFqkDreZ0V0bH4R9cTN1OkcEG78OLxVptLWOI'),
            ],
            role_id: 'profiles',
        });
        this.agents = agents;
        this.latency = latency;
    }
    get myPubKey() {
        return this.cell.cell_id[1];
    }
    create_profile({ nickname }) {
        const profile = { nickname, fields: {} };
        this.agents.put(this.myPubKey, profile);
        return fakeRecord({
            entry: encode(profile),
            entry_type: 'App',
        });
    }
    search_profiles({ nickname_prefix }) {
        return this.agents.pickBy(profile => profile.nickname.startsWith(nickname_prefix.slice(0, 3)));
    }
    get_my_profile() {
        return this.agents.get(this.myPubKey);
    }
    get_agent_profile(agent_address) {
        return this.agents.get(agent_address);
    }
    get_all_profiles() {
        return this.agents
            .values()
            .map(profile => fakeRecord({ entry: encode(profile), entry_type: 'App' }));
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