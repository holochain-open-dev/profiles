# @holochain-open-dev/profiles

The profiles zome and its accompanying frontend module are designed to implement and export useful functionality around personal profile information about the agents in a Holochain DHT.

The only field that this module assumes is the nickname, which it index the agents by.

Existing functionalities:

- Creating a profile.
- Updating a profile.
- Searching agents by nickname.
- Getting the profile for a list of agents.
- Configurable profile fields.
- Profile detail frontend element.

> In the future, when the personas & profiles application is fully developed, this module will switch to storing data in it, and will serve only as a bridge to get that private data. We hope to maintain the modules and their interfaces as similar as they are now, and that the migration friction is low.

This module follows the [holochain-open-dev](https://github.com/holochain-open-dev/) pattern of developing holochain modules. Read [its documentation](https://holochain-open-dev.github.io) to understand more about its motivation and the big picture.

To integrate this module into your application:

- If you are starting a new project from scratch, it is very recommended to follow the [Template Setup](?path=/docs/template-setup--docs).
- If not, you can visit [Setting up the Backend](?path=/docs/backend-setting-up-the-zomes--docs) and [Setting up the Frontend](?path=/docs/frontend-setting-up-the-frontend--docs).
