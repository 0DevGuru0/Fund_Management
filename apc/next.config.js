/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});
// const { withSentryConfig } = require('@sentry/nextjs');

const mergeWebpackConfig = require('./mergeWebpackConfig');

// const SentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore
//
//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

const moduleExports = withBundleAnalyzer({
  // keep development cache indefinitely
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 1000,
    pagesBufferLength: 1000,
  },
  webpack: (config, { isServer, dev }) => {
    mergeWebpackConfig(config);

    if (isServer) {
      config.externals.push('_http_common');

      const oldEntry = config.entry;
      config.entry = () =>
        oldEntry().then((entry) => ({
          ...entry,
          worker: './src/worker/index.ts',
        }));
    }

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    // DB
    DATABASE_URL: process.env.DATABASE_URL,
    CAMUNDA_DATABASE_URL: process.env.CAMUNDA_DATABASE_URL,
    // Camunda
    WF_CAMUNDA_SERVER_ADDRESS: process.env.WF_CAMUNDA_SERVER_ADDRESS,
    WF_SERVICE_SERVER_ADDRESS: process.env.WF_SERVICE_SERVER_ADDRESS,
    // REPO
    REPO_API_KEY: process.env.REPO_API_KEY,
    REPO_PARENT_ID_FUND: process.env.REPO_PARENT_ID_FUND,
    REPO_PARENT_ID_JOURNAL: process.env.REPO_PARENT_ID_JOURNAL,
    REPO_PARENT_ID_PUBLISHER: process.env.REPO_PARENT_ID_PUBLISHER,
    // Open ID Connect
    OIDC_CLIENT_KEYCLOAK_UNIQUE_ID: process.env.OIDC_CLIENT_KEYCLOAK_UNIQUE_ID,
    KEYCLOAK_ADMIN_USERNAME: process.env.KEYCLOAK_ADMIN_USERNAME,
    KEYCLOAK_ADMIN_PASSWORD: process.env.KEYCLOAK_ADMIN_PASSWORD,
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET_KEY: process.env.OIDC_CLIENT_SECRET_KEY,
    OIDC_REALM: process.env.OIDC_REALM,
    OIDC_PROVIDER_ADDRESS: process.env.OIDC_PROVIDER_ADDRESS,
    OIDC_ENDPOINT: process.env.OIDC_ENDPOINT,
    OIDC_TOKEN_ENCRYPTION_SECRET_KEY: process.env.OIDC_TOKEN_ENCRYPTION_SECRET_KEY,
    // SMTP
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    // FILE_STORAGE
    FILE_STORAGE_AWS_REGION: process.env.FILE_STORAGE_AWS_REGION,
    FILE_STORAGE_ACCESS_KEY_ID: process.env.FILE_STORAGE_ACCESS_KEY_ID,
    FILE_STORAGE_SECRET_ACCESS_KEY: process.env.FILE_STORAGE_SECRET_ACCESS_KEY,
    FILE_STORAGE_BUCKET: process.env.FILE_STORAGE_BUCKET,
    FILE_STORAGE_DOWNLOAD_SIGNED_URL_EXPIRATION_TIME:
      process.env.FILE_STORAGE_DOWNLOAD_SIGNED_URL_EXPIRATION_TIME,
    FILE_STORAGE_UPLOAD_SIGNED_URL_EXPIRATION_TIME:
      process.env.FILE_STORAGE_UPLOAD_SIGNED_URL_EXPIRATION_TIME,
    FILE_STORAGE_MAX_SINGLE_FILE_UPLOAD_SIZE:
      process.env.FILE_STORAGE_MAX_SINGLE_FILE_UPLOAD_SIZE,
  },
  publicRuntimeConfig: {
    HIDE_DOCUMENTATION: process.env.HIDE_DOCUMENTATION,
    NEXT_PUBLIC_API_SERVER_ADDRESS: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS,
    FILE_STORAGE_BUCKET_ENV: process.env.FILE_STORAGE_BUCKET,
    FILE_STORAGE_AWS_REGION_ENV: process.env.FILE_STORAGE_AWS_REGION,
  },
  env: {
    REPO_SUBJECT_TREE_ID: '60fbbcac0023940006e0d9cb',
  },
});

// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
module.exports = moduleExports;
