import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

export default {
  input: `src/index.ts`,
  output: [{ dir: "dist", format: "es", sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  external: ["@holochain/conductor-api"],
  plugins: [
    replace({
      "process.env.NODE_ENV": '"production"',
      delimiters: ["", ""],
    }),
    typescript(),
    builtins(),
    resolve(),
    commonjs(),
  ],
};
