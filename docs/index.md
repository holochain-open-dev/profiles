---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@holochain-open-dev/profiles"
  text: "Profiles module for holochain apps"
  tagline: Plug-and-play profile management for your hApps
  actions:
    - theme: brand
      text: Setup
      link: /setup.md
    - theme: alt
      text: Integrity Zome API
      link: "/backend/doc/hc_zome_profiles_integrity/index.html"
      target: "_blank"
    - theme: alt
      text: Coordinator Zome API
      link: "/backend/doc/hc_zome_profiles_coordinator/index.html"
      target: "_blank"
    - theme: alt
      text: Frontend API
      link: "/elements/profile-prompt.md"
      target: "_blank"

features:
  - title: UI+Backend Module
    details: Following the holochain-open-dev guidelines
    link: https://holochain-open-dev.github.io
  - title: Manage your profile
    details: Create and update your profile
  - title: Search by nickname
    details: Form elements for entries with a field of type `AgentPubKey`
  - title: Configurable profile fields
    details: Customize the fields that you need in your hApp
---
