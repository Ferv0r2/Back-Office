const webpack = require('webpack')

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    const overridedConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: [...config.resolve.extensions, '.ts', '.js'],
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          stream: require.resolve('stream-browserify'),
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify/browser'),
          url: require.resolve('url'),
          assert: require.resolve('assert'),
          buffer: require.resolve('buffer'),
        },
        alias: {
          ...config.resolve.alias,
          buffer: 'buffer',
          stream: 'stream-browserify',
        },
      },
      plugins: [
        ...config.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    }
    return overridedConfig
  },
}
