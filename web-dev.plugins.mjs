import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupBuiltins from 'rollup-plugin-node-builtins';
import rollupReplace from '@rollup/plugin-replace';
import rollupGlobals from 'rollup-plugin-node-globals';

const replace = fromRollup(rollupReplace);
const builtins = fromRollup(rollupBuiltins);
const commonjs = fromRollup(rollupCommonjs);
const globals = fromRollup(rollupGlobals);

export default [
  replace({
    'process.env.NODE_ENV': '"production"',
    'process.env.HC_PORT': JSON.stringify(process.env.HC_PORT),
    '  COMB =': 'window.COMB =',

    delimiters: ['', ''],
  }),
  builtins(),
  commonjs({}),
  globals(),
];
