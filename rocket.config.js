import { rocketLaunch } from "@rocket/launch";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { addPlugin } from "plugins-manager";

/** @type {import('@rocket/cli').RocketCliOptions} */
export default {
  setupDevAndBuildPlugins: [
    addPlugin(replace, {
      "import 'mermaid/dist/mermaid'": "import 'mermaid/dist/mermaid.js'",
      "module.exports = ws": "export default WebSocket",
      'import fetch from "cross-fetch";': "",
      delimiters: ["", ""],
    }),
  ],
  presets: [rocketLaunch()],
  devServer: {
    nodeResolve: {
      browser: true,
      preferBuiltins: false,
      mainFields: ["module", "browser", "main"],
    },
  },
};
