import { membraneContext } from '@holochain-open-dev/membrane-context';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { ScopedElementsMixin as Scoped } from '@open-wc/scoped-elements';
import { Constructor, LitElement } from 'lit-element';
import { ProfilesService } from '../profiles.service';

export class BaseElement extends membraneContext(
  Scoped(LitElement) as Constructor<LitElement>
) {
  
  get _profilesService(): ProfilesService {
    return new ProfilesService(
      this.membraneContext.appWebsocket as AppWebsocket,
      this.membraneContext.cellId as CellId
    );
  }
}
