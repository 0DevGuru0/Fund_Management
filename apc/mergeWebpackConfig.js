const path = require('path');

module.exports = (config) => {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const webpack = require('webpack');

  const rules = config.module.rules;
  if (Array.isArray(rules)) {
    config.module.rules = rules.filter((rule) => !rule.test?.test('.svg'));
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    lodash: path.resolve('./node_modules', 'lodash-es'),
  };

  const plugins = [
    new webpack.DefinePlugin({
      'process.env.PROJECT_ROOT_PATH': JSON.stringify(path.resolve('.')),
    }),
  ];

  if (config.plugins) {
    config.plugins.push(...plugins);
  } else {
    config.plugins = [...plugins];
  }

  config.module.rules.unshift(
    {
      // We cannot use issuer due to this bug https://github.com/webpack/webpack/issues/9309
      // issuer: {
      //   test: /\.(j|t)sx?$/,
      // },
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
                removeTitle: false,
              },
            },
          },
        },
        // we don't use url-loader for now and we inline the SVGs so we can change them
        // { loader: 'url-loader', options: { limit: 1024 * 1024 } },
      ],
    },
    {
      test: /\.html$/i,
      loader: 'html-loader',
    },
  );
};
