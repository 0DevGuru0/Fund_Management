import got from 'got';
import getConfig from 'next/config';

import { orvalGotMutator } from './orvalGotMutator';

const { serverRuntimeConfig } = getConfig();

const instance = got.extend({
  prefixUrl: serverRuntimeConfig.WF_SERVICE_SERVER_ADDRESS,
});

export const mutator = orvalGotMutator(instance);
