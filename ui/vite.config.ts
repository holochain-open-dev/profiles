// vite.config.js
import checker from "vite-plugin-checker";
import { defineConfig } from "vite";

const components = [
  "dropdown",
  "alert",
  "menu",
  "menu-item",
  "checkbox",
  "divider",
  "menu-label",
  "option",
  "select",
  "tooltip",
  "card",
  "icon-button",
  "button",
  "icon",
  "input",
  "spinner",
  "avatar",
  "skeleton",
];
const exclude = components.map(
  (c) => `@shoelace-style/shoelace/dist/components/${c}/${c}.js`
);
export default defineConfig({
  root: "./demo",
  plugins: [
    checker({
      typescript: true,
    }),
  ], // e.g. use TypeScript check
});
