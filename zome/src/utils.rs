use hdk::prelude::*;

pub fn try_get_and_convert<T: TryFrom<SerializedBytes>>(entry_hash: EntryHash) -> ExternResult<T> {
    match get(entry_hash.clone(), GetOptions::default())? {
        Some(element) => try_from_element(element),
        None => Err(crate::err("Entry not found")),
    }
}

pub fn try_from_element<T: TryFrom<SerializedBytes>>(element: Element) -> ExternResult<T> {
    match element.entry() {
        element::ElementEntry::Present(entry) => try_from_entry::<T>(entry.clone()),
        _ => Err(crate::err("Could not convert element")),
    }
}

pub fn try_from_entry<T: TryFrom<SerializedBytes>>(entry: Entry) -> ExternResult<T> {
    match entry {
        Entry::App(content) => match T::try_from(content.into_sb()) {
            Ok(e) => Ok(e),
            Err(_) => Err(crate::err("Could not convert entry")),
        },
        _ => Err(crate::err("Could not convert entry")),
    }
}
