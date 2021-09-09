import { Context, ContextConsumer } from "@lit-labs/context";
import { ReactiveElement } from "@lit/reactive-element";
import { StoreController } from "./store-controller";
import { Readable } from "svelte/store";

export class ContextStoreController<
  V,
  HostElement extends ReactiveElement,
  Ctx = Readable<V>
> extends ContextConsumer<Ctx, HostElement> {
  storeController!: StoreController<V>;

  get value() {
    return this.storeController.value;
  }

  constructor(
    host: HostElement,
    context: Context<Ctx>,
    callback: (value: V) => any,
    selectStore?: (context: Ctx) => Readable<V>
  ) {
    super(host, context, (value) => {
      if (this.storeController) {
        this.storeController._unsubscribe();
      }

      let store = value as unknown as Readable<V>;
      if (selectStore) store = selectStore(value);

      this.storeController = new StoreController(host, store, callback);
    });
  }
}
