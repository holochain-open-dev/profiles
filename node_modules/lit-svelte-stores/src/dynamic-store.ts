import { Readable, Unsubscriber } from "svelte/store";
import { ReactiveController, ReactiveElement } from "lit";

/**
 * Tracks a changing store, derived at each update
 */
export class DynamicStore<V, El extends ReactiveElement>
  implements ReactiveController
{
  value!: V;

  public _unsubscribe!: Unsubscriber;

  private _previousStore: Readable<V> | undefined;

  constructor(protected host: El, protected getStore: () => Readable<V>) {
    host.addController(this);
  }

  hostUpdate() {
    this.resubscribe();
  }

  hostDisconnected() {
    this._unsubscribe();
  }

  resubscribe() {
    const store = this.getStore();

    if (store !== this._previousStore) {
      if (this._unsubscribe) this._unsubscribe();

      if (store) {
        this._unsubscribe = store.subscribe((value) => {
          this.value = value;
          this.host.requestUpdate();
        });
      }
    }

    this._previousStore = store;
  }
}
