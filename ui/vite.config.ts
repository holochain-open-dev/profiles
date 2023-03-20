// vite.config.js
import checker from "vite-plugin-checker";
import { defineConfig } from "vite";

const components = [
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
  optimizeDeps: {
    exclude,
  },
  root: "./demo",
  plugins: [
    checker({
      typescript: true,
    }),
  ], // e.g. use TypeScript check
});
