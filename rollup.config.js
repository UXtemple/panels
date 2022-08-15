import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

export default [
  {
    plugins: [
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
      }),
    ],
  },
];
