const mergeWebpackConfig = require('../mergeWebpackConfig');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    'storybook-zeplin/register',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-mobile',
    '@storybook/addon-a11y',
    'storybook-addon-locale/register',
  ],
  typescript: {
    // the storybook's native version of fork ts checker is old so we use our own (it will be updated on storybook 7)
    check: false,
  },
  webpackFinal: (config) => {
    mergeWebpackConfig(config);
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== '/\\.css$/',
    );

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf)$/,
      use: ['url-loader'],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        logger: {
          infrastructure: 'silent',
          issues: 'webpack-infrastructure',
        },
        typescript: {
          enabled: true,
          mode: 'write-references',
          diagnosticOptions: {
            syntactic: true,
            semantic: true,
          },
        },
        eslint: {
          enabled: false,
          files: ['./src/**/*.{ts, tsx, js, jsx, json}'],
        },
        issue: {
          exclude: {
            file: '**/src/service/**/*'
          }
        }
      }),
    );

    return config;
  },
};
