/* eslint-disable import/order */
/* eslint-disable import/first */
// ! The order is important here don't change it!!
import { loadEnvConfig } from '@next/env';
import { sysLog } from '$service/logger';

// eslint-disable-next-line no-empty-function
loadEnvConfig(process.cwd(), true, { info: () => null, error: sysLog.error });

import { setConfig } from 'next/config';
import config from '../next.config';

setConfig(config);

import { initPrisma, terminatePrisma } from '$data/prisma';
import initTestDatabase from '$test/helpers/initTestDatabase';

jest.setTimeout(20000);

beforeAll(async () => {
  await initTestDatabase();
  await initPrisma();
}, 40000);

afterAll(async () => {
  await terminatePrisma();
}, 20000);
