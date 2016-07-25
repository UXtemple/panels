const replace = require('rollup-plugin-replace');

const workerUrl = process.env.NODE_ENV === 'development' ?
  '${location.origin}/panels-worker.js' :
  'https://cdn.uxtemple.com/panels-worker.js';

module.exports = {
  onwarn: function(str) {
    if (!/^Treating/.test(str)) {
      console.error(str);
    }
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__USEPAGES_WORKER_URL__': JSON.stringify(workerUrl)
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
};
