import { ActionCommittedSignal } from "@holochain-open-dev/utils";

export type ProfilesSignal = ActionCommittedSignal<EntryTypes, any>;

export type EntryTypes = { type: "Profile" } & Profile;

export interface Profile {
  nickname: string;
  fields: Record<string, string>;
}
