/* eslint-disable no-console */

import path from 'path';

import BPD from '@iin/build-push-deploy';

// parse the arguments
const argv = process.argv;
const [, , environment] = argv;

const gitRoot = path.resolve(__dirname, '../../');

const bpd = new BPD(gitRoot, {
  environment,
  prefix: 'iknito-workflow',
  dryRun: process.env.CI !== 'true',
  projectName: 'iknito-workflow',
  singleProjectMonorepo: true,
  kubernetes: {
    namespace: `iknito-workflow`,
    context:
      environment === 'nightly'
        ? 'iknito-workflow-nightly'
        : 'iknito-workflow-production',
    configsDir: 'k8s/apc',
  },
  services: {
    'iknito-smartfund': {
      kind: 'deployment',
      directory: 'apc',
    },
  },
});

bpd.buildPushDeploy({ deploy: true }).catch((e) => {
  console.error('\tFailed to deploy:\n\n ', e);
  process.exit(1);
});
