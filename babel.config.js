const babelConfig = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: []
}

if (process.env.NODE_ENV !== 'development') {
  babelConfig.plugins = babelConfig.plugins.concat([
    'transform-remove-console',
    'transform-remove-debugger'
  ])
}

module.exports = babelConfig
