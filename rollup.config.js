module.exports = {
  onwarn: function(str) {
    if (!/^Treating/.test(str)) {
      console.error(str);
    }
  },
  plugins: [
    require('rollup-plugin-babel')({
      exclude: 'node_modules/**',
      plugins: [require('babel-plugin-external-helpers')],
      presets: [require('babel-preset-es-uxtemple')]
    })
  ]
}
