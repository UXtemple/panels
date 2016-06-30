const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

module.exports = {
  onwarn(str) {
    if (!/^Treating/.test(str)) {
      console.error(str);
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: [require('babel-plugin-external-helpers')],
      presets: [require('babel-preset-es-uxtemple')]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
