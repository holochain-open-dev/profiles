export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface Profile {
    nickname: string;
    fields: Dictionary<string>;
}
export interface AgentProfile {
    agent_pub_key: string;
    profile: Profile;
}
