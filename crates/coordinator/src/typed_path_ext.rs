///! Copy of the code from holochain but without internal calls to .ensure(),
///! and added a GetStrategy argument to not force use of default.
use hdk::prelude::*;

/// Get all the links from this path to paths below it.
/// Only returns links between paths, not to other entries that might have their own links.
pub fn tp_children(
    tp: &TypedPath,
    strategy: GetStrategy,
) -> ExternResult<Vec<holochain_zome_types::link::Link>> {
    let mut unwrapped = get_links(
        LinkQuery {
            base: AnyLinkableHash::from(tp.path_entry_hash()?),
            link_type: LinkTypeFilter::single_type(tp.link_type.zome_index, tp.link_type.zome_type),
            tag_prefix: None,
            after: None,
            before: None,
            author: None,
        },
        strategy,
    )?;
    // Only need one of each hash to build the tree.
    unwrapped.sort_unstable_by(|a, b| a.tag.cmp(&b.tag));
    unwrapped.dedup_by(|a, b| a.tag.eq(&b.tag));
    Ok(unwrapped)
}

/// Get all the links from this path to paths below it.
/// Same as `Path::children` but returns `Vec<Path>` rather than `Vec<Link>`.
/// This is more than just a convenience. In general it's not possible to
/// construct a full `Path` from a child `Link` alone as only a single
/// `Component` is encoded into the link tag. To build a full child path
/// the parent path + child link must be combined, which this function does
/// to produce each child, by using `&self` as that parent.
pub fn tp_children_paths(tp: &TypedPath, strategy: GetStrategy) -> ExternResult<Vec<TypedPath>> {
    let children = tp_children(tp, strategy)?;
    //debug!("tp_children_paths() children = {:?}", children);
    return links_to_paths(tp, children);
}

///
pub fn links_to_paths(tp: &TypedPath, children: Vec<Link>) -> ExternResult<Vec<TypedPath>> {
    let components: ExternResult<Vec<Option<Component>>> = children
        .into_iter()
        .map(|link| {
            let component_bytes = &link.tag.0[..];
            if component_bytes.is_empty() {
                Ok(None)
            } else {
                //debug!("tp_children_paths() component_bytes = {:?}", component_bytes);
                Ok(Some(
                    SerializedBytes::from(UnsafeBytes::from(component_bytes.to_vec()))
                        .try_into()
                        .map_err(|e: SerializedBytesError| wasm_error!(e))?,
                ))
            }
        })
        .collect();
    Ok(components?
        .into_iter()
        .map(|maybe_component| {
            let mut new_path = tp.path.clone();
            if let Some(component) = maybe_component {
                new_path.append_component(component);
            }
            new_path.into_typed(tp.link_type)
        })
        .collect())
}

///--------------------------------------------------------------------------------------------------
/// Extra methods

/// Return all LeafPaths from this Path
/// A LeafPath is a Path with no sub Paths of same type.
/// USE WITH CARE as this can easily timeout as it's a recursive loop of get_links()
#[allow(dead_code)]
pub fn tp_leaf_children(tp: &TypedPath, strategy: GetStrategy) -> ExternResult<Vec<TypedPath>> {
    let children = tp_children_paths(tp, strategy)?;
    //debug!("tp_leaf_children() children = {:?}", children);

    if children.is_empty() {
        return Ok(vec![tp.clone()]);
    }
    let mut res = Vec::new();
    for child_tp in children {
        let mut grand_children = tp_leaf_children(&child_tp, strategy)?;
        res.append(&mut grand_children);
    }
    Ok(res)
}
