const replace = require('rollup-plugin-replace')

module.exports = {
  onwarn: function(str) {
    if (!/^Treating/.test(str)) {
      console.error(str)
    }
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    require('rollup-plugin-babel')({
      exclude: 'node_modules/**',
      plugins: [
        require('babel-plugin-external-helpers')
      ],
      presets: [
        require('babel-preset-es-uxtemple')
      ]
    })
  ]
}
