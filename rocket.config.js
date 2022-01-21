import { rocketLaunch } from "@rocket/launch";
import replace from "@rollup/plugin-replace";
import { addPlugin } from "plugins-manager";

/** @type {import('@rocket/cli').RocketCliOptions} */
export default {
  setupDevAndBuildPlugins: [
    addPlugin(replace, {
      "import 'mermaid/dist/mermaid'": "import 'mermaid/dist/mermaid.js'",
      delimiters: ["", ""],
    }),
  ],
  presets: [rocketLaunch()],
};
