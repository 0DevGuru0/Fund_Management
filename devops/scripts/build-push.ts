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
  awsEcrRegistry: '575302467300.dkr.ecr.eu-central-1.amazonaws.com',
  projectName: 'iknito-workflow',
  singleProjectMonorepo: true,
  buildDir: '../build',
  services: {
    'iknito-smartfund': {
      kind: 'deployment',
      directory: 'apc',
    },
  },
});

bpd.buildPushDeploy({ build: true, push: true }).catch((e) => {
  console.error('\tFailed to build and push:\n\n ', e);
  process.exit(1);
});
