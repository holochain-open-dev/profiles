import { defineConfig, } from "vitepress";
// import mermaid from "@agoose77/markdown-it-mermaid";
import { withMermaid } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  vue: {
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        'mermaid'
      ]
    }
  },
  base: "/profiles",
  title: "@holochain-open-dev/profiles",
  description: "Profiles module for holochain apps",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
        text: "Setup",
        link: "/setup.md",
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
    search: {
      provider: 'local'
    }
  },
  head: [
    [
      'script',
      {},
      // Synchronize the vitepress dark/light theme with the shoelace mode
      `
  function syncTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      const isShoelaceDark = document.documentElement.classList.contains('sl-theme-dark');
      if (isDark && !isShoelaceDark) document.documentElement.classList = "dark sl-theme-dark";
      if (!isDark && isShoelaceDark) document.documentElement.classList = "";
  }
  const attrObserver = new MutationObserver((mutations) => {
    mutations.forEach(mu => {
      if (mu.type !== "attributes" && mu.attributeName !== "class") return;
      syncTheme();
    });
  });
  attrObserver.observe(document.documentElement, {attributes: true});
  syncTheme();
        `
    ]
  ],
});
