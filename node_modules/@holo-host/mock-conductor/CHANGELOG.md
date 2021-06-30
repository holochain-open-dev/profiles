# Changelog
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.3] - 2021-05-12
### Changed
- Now awaits callbacks passed to `.once`, `.next` and `.any`.

## [0.3.2] - 2021-05-10

Bumps msg-pack depenancy to v2.4.0
Bumps holochain-conductor-api dependancy to v0.0.4
Removes `LIST_ACTIVE_APP_IDS_TYPE` to align with holochain-conductor-api v0.0.4
Adds new types to align with holochain-conductor-api v0.0.4
    Including:
        - `REGISTER_DNA_TYPE`
        - `CREATE_CLONE_CELL_TYPE`
        - `INSTALL_APP_BUNDLE_TYPE`
        - `LIST_ACTIVE_APP`
        - `LIST_APP_INTERFACES`
        - `REQUEST_AGENT_INFO`
        - `ADD_AGENT_INFO`
Updates app interface connection params to align with holochain-conductor-api v0.0.4 

## [0.3.1] - 2021-03-16

No changes. This release is the same as 0.2.1

## [0.2.1] - 2021-03-15
### Added
- You can now cause a call to return an error by passing `{ returnError: true }` as the opts parameter to call to `next`, `once`, or `any`

## [0.3.0] - 2021-02-?

This release was published to NPM, but nobody remembers publishing it and it is unclear from what commit it was published.

## [0.2.0] - 2021-01-25
### Added
- Filter 'args' and 'caps' out of data when generating a response key


## Types of changes
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
