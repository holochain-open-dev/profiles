import { asyncReadable, AsyncReadable } from "@holochain-open-dev/stores";
import { ActionCommittedSignal, ZomeClient } from "@holochain-open-dev/utils";
import {
  decodeHashFromBase64,
  encodeHashToBase64,
  HoloHash,
} from "@holochain/client";

export function uniquify<H extends HoloHash>(array: Array<H>): Array<H> {
  const strArray = array.map((h) => encodeHashToBase64(h));
  const uniqueArray = [...new Set(strArray)];
  return uniqueArray.map((h) => decodeHashFromBase64(h) as H);
}
