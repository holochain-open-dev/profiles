import { Dictionary } from "@holochain-open-dev/core-types";

export interface Profile {
  nickname: string;
  fields: Dictionary<string>;
}
