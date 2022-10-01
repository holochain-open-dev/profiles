import { rocketLaunch } from "@rocket/launch";
import { presetRocketSearch } from "@rocket/search";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { adjustPluginOptions, addPlugin } from "plugins-manager";

const resolveOptions = {
  browser: true,
  preferBuiltins: false,
  mainFields: ["module", "browser", "main"],
  exportConditions: ['browser', 'development'],
};

/** @type {import('@rocket/cli').RocketCliOptions} */
export default {
  buildOpenGraphImages: false,
  setupDevServerAndBuildPlugins: [addPlugin(commonjs, {})],
  setupBuildPlugins: [adjustPluginOptions(resolve, resolveOptions)],
  presets: [rocketLaunch(), presetRocketSearch()],
  adjustDevServerOptions(options) {
    options.nodeResolve = resolveOptions;
    return options;
  },
  pathPrefix: "/profiles/",
};
