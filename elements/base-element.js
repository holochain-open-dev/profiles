import { membraneContext } from '@holochain-open-dev/membrane-context';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { LitElement } from 'lit-element';
import { ProfilesService } from '../profiles.service';
export class BaseElement extends membraneContext(Scoped(LitElement)) {
    get _profilesService() {
        return new ProfilesService(this.membraneContext.appWebsocket, this.membraneContext.cellId);
    }
}
//# sourceMappingURL=base-element.js.map