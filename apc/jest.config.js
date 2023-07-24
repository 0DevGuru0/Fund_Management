/* eslint-disable @typescript-eslint/no-var-requires */
const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');

const moduleNameMapper = getJestMappersFromTSConfig();

module.exports = {
  moduleNameMapper,
  setupFilesAfterEnv: ['jest-extended', './test/jest/toBeDeepEqual.ts'],
  setupFiles: ['./test/jest/patchRequireContext.ts'],
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/dist/', '/test/'],
  testRegex: '\\.test\\.ts$',
  // configure typescript traspilation for jest
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  watchPlugins: [
    [
      'jest-watch-typeahead/filename',
      {
        // Override jest default filtering by filename regex pattern
        key: 'p',
        promot: 'filter by a filename regex pattern',
      },
    ],
    [
      'jest-watch-typeahead/testname',
      {
        // Override jest default filtering by test name regex pattern
        key: 't',
        promot: 'filter by a test name regex pattern',
      },
    ],
  ],
  cacheDirectory: '/tmp/jest-cache',
};
