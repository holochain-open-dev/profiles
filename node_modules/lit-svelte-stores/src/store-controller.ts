import { Readable, Unsubscriber } from "svelte/store";
import { ReactiveController, ReactiveElement } from "lit";

export class StoreController<V> implements ReactiveController {
  value!: V;

  public _unsubscribe!: Unsubscriber;

  constructor(
    protected host: ReactiveElement,
    protected store: Readable<V>,
    protected callback?: (value: V) => any
  ) {
    host.addController(this);
  }

  hostConnected() {
    this._unsubscribe = this.store.subscribe((value) => {
      this.value = value;
      if (this.callback) this.callback(value);
      this.host.requestUpdate();
    });
  }

  hostDisconnected() {
    this._unsubscribe();
  }
}
