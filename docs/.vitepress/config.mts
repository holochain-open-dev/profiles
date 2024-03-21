import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
  base: "/profiles",
  title: "@holochain-open-dev/profiles",
  description: "Profiles module for holochain apps",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Guides",
        items: [
          {
            text: "Setup",
            link: "/setup.md",
          },
        ],
      },
      {
        text: "API Reference",
        items: [
          {
            text: "Integrity Zome",
            link: "/backend/doc/hc_zome_profiles_integrity/index.html",
            target: "_blank",
          },
          {
            text: "Coordinator Zome",
            link: "/backend/doc/hc_zome_profiles_coordinator/index.html",
            target: "_blank",
          },
          {
            text: "Frontend",
            items: [
              {
                text: "ProfilesStore",
                link: "/profiles-store.md",
              },
              {
                text: "Elements",
                items: [
                  {
                    text: "profiles-context",
                    link: "/profiles-context.md",
                  },
                  {
                    text: "profile-prompt",
                    link: "/profile-prompt.md",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/holochain-open-dev/profiles",
      },
    ],
  },
});
