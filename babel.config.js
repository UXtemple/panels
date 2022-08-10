module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-classes',
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
  ignore: [/node_modules/],
};
