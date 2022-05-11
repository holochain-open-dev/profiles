import { css, html, LitElement } from 'lit';
import { provide } from '@holochain-open-dev/context';
import { property } from 'lit/decorators.js';

import { profilesStoreContext } from '../context';
import { ProfilesStore } from '../profiles-store';

export class ProfilesContext extends LitElement {
  @property({ type: Object })
  store!: ProfilesStore;

  render() {
    return html`<slot ${provide(profilesStoreContext, this.store)}></slot>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}
