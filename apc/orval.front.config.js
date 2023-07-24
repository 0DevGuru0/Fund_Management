module.exports = {
  apcApi: {
    input: {
      target: 'http://localhost:3000/api/v1/openapi',
    },
    output: {
      mode: 'split',
      client: 'react-query',
      target: './src/application/lib/generated/apcApi.ts',
      override: {
        mutator: {
          path: './src/application/lib/orvalFetchMutator.ts',
          name: 'orvalFetchMutator',
        },
      },
    },
  },
};
