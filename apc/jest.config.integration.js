const config = require('./jest.config');

config.testPathIgnorePatterns = config.testPathIgnorePatterns
  .filter((path) => !/\/test/.test(path))
  .concat('<rootDir>/src/');

config.setupFilesAfterEnv = config.setupFilesAfterEnv.concat(['./test/setup.ts']);

module.exports = config;
