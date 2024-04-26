import {
  AsyncComputed,
  AsyncResult,
  AsyncSignal,
  joinAsync,
  JoinAsyncOptions,
} from "@holochain-open-dev/signals";
import { HoloHashMap } from "@holochain-open-dev/utils";
import { HoloHash } from "@holochain/client";

type SignalValue<T> = T extends AsyncSignal<infer U>
  ? U
  : T extends AsyncSignal<infer U>
  ? U
  : never;

/**
 * Joins all the results in a HoloHashMap of `AsyncSignals`
 */
export function joinAsyncMap<K extends HoloHash, V extends AsyncSignal<any>>(
  map: ReadonlyMap<K, V>,
  joinOptions?: JoinAsyncOptions
): AsyncSignal<ReadonlyMap<K, SignalValue<V>>> {
  const signalArray = Array.from(map.entries()).map(
    ([key, signal]) =>
      new AsyncComputed<[K, SignalValue<V>]>(() => {
        const result = signal.get();
        if (result.status !== "completed") return result;
        const value = [key, result.value] as [K, SignalValue<V>];
        return {
          status: "completed",
          value,
        };
      })
  );
  const arraySignal = joinAsync(signalArray, joinOptions);

  return new AsyncComputed(() => {
    const result = arraySignal.get();
    if (result.status !== "completed") return result;

    const value = new HoloHashMap<K, SignalValue<V>>(result.value);
    return {
      status: "completed",
      value,
    } as AsyncResult<ReadonlyMap<K, SignalValue<V>>>;
  });
}
