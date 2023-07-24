// const isLoadIntentTest = process.env.NODE_ENV === 'test';
const isLoadIntentDevelopment = process.env.NODE_ENV === 'development';

module.exports = (api) => {
  // const supportsESM = api.caller((caller) => !!caller?.supportsStaticESM);
  const isCallerDevelopment = api.caller((caller) => caller?.isDev);

  // Look at external intent if used without a caller (e.g. via Jest):
  // const isTest = isCallerDevelopment == null && isLoadIntentTest;

  // Look at external intent if used without a caller (e.g. Storybook):
  const isDevelopment =
    isCallerDevelopment === true ||
    (isCallerDevelopment == null && isLoadIntentDevelopment);

  // Default to production mode if not `test` nor `development`:
  // const isProduction = !(isTest || isDevelopment);
  const isServer = api.caller((caller) => {
    return !!caller && caller.target === 'node';
  });

  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ];

  // the material-ui treeshaking should automatically happen in production by webpack
  if (isDevelopment && !isServer) {
    plugins.push(
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/core',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'core',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'icons',
      ],
    );
  }

  return {
    presets: ['next/babel'],
    plugins,
  };
};
