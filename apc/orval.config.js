module.exports = {
  wfCamunda: {
    input: './src/service/wfEngine/camunda-7-15.openapi.json',
    output: {
      target: './src/service/generated/wfCamunda.ts',
      client: 'axios',
      override: {
        mutator: {
          path: './src/service/wfEngine/camundaMutator.ts',
          name: 'mutator',
        },
      },
    },
  },
  // this will not change and we've already generated it
  // TODO: you should uncomment and regenarate this if the Workflow Service API changes
  // wfService: {
  //   input: {
  //     target: 'http://localhost:8080/azdegar/rest/v2/api-docs',
  //     override: {
  //       transformer: './src/service/wfEngine/transformServiceOas.js',
  //     },
  //   },
  //   output: {
  //     target: './src/service/generated/wfService.ts',
  //     client: 'axios',
  //     override: {
  //       mutator: {
  //         path: './src/service/wfEngine/serviceMutator.ts',
  //         name: 'mutator',
  //       },
  //     },
  //   },
  // },
};
