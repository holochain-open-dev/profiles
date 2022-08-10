use serde::{Serialize, Deserialize};
/// Input for the `search_profiles` zome function.
///
/// The nickname prefix must be of at least 3 characters.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchProfilesInput {
    pub nickname_prefix: String,
}
