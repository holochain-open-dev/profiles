import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: `src/bundle.ts`,
  output: [{ dir: 'bundle', format: 'es', sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  external: [],
  plugins: [
    replace({
      'process.env.NODE_ENV': '"production"',
    }),
    typescript({
      outDir: 'bundle',
    }),
    resolve(),
    commonjs({ include: [] }),
    terser(),
  ],
};
