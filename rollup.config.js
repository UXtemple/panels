const replace = require('rollup-plugin-replace')

const pkg = require('./package.json')

module.exports = {
  onwarn: function(str) {
    if (!/^Treating/.test(str)) {
      console.error(str)
    }
  },
  external: Object.keys(pkg.dependencies)
    .concat(Object.keys(pkg.devDependencies))
    .concat('regenerator-runtime'),
  plugins: [
    {
      resolveId(importee) {
        if (/regenerator$/.test(importee)) {
          return 'regenerator-runtime' // ${importee}/index.js`
        }
      },
    },

    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    require('rollup-plugin-babel')({
      exclude: 'node_modules/**',
      presets: [require.resolve('babel-preset-react-app-rollup')],
    }),
  ],
}
