import { ReactiveElement } from "@lit/reactive-element";
import { Readable } from "svelte/store";
import { decorateProperty } from "@lit/reactive-element/decorators/base.js";
import { ContextStoreController } from "./context-store-controller";
import { Context } from "@lit-labs/context";

export function contextStore<V, Ctx>({
  context,
  selectStore,
}: {
  context: Context<Ctx>;
  selectStore?: (context: Ctx) => Readable<V>;
}): <K extends PropertyKey>(
  protoOrDescriptor: ReactiveElement & Record<K, V>,
  name?: K
  // Note TypeScript requires the return type to be `void|any`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => void | any {
  return decorateProperty({
    finisher: (ctor: typeof ReactiveElement, name: PropertyKey) => {
      ctor.addInitializer((element: ReactiveElement): void => {
        element.addController(
          new ContextStoreController(
            element,
            context,
            (value: V) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- have to force the property on the type
              (element as any)[name] = value;
            },
            selectStore
          )
        );
      });
    },
  });
}
