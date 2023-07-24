import BlueBird from 'bluebird';

import { sysLog } from '$logger';
import { PrismaClient as BackendPrisma } from '.prisma/backend-client';
import { PrismaClient as CamundaPrisma } from '.prisma/camunda-client';

let backendPrisma: BackendPrisma;
let camundaPrisma: CamundaPrisma;

export const getBackendPrisma = async (): Promise<BackendPrisma> => {
  if (!backendPrisma) {
    let isConnected = false;
    while (!isConnected) {
      try {
        backendPrisma = new BackendPrisma({
          datasources: {
            db: { url: process.env.DATABASE_URL },
          },
        });

        await backendPrisma.$connect();
        sysLog.info(`Prisma: successfully connected`);
        isConnected = true;
      } catch (e) {
        sysLog.error(`Prisma: ${e}`);
        await backendPrisma.$disconnect();
        await BlueBird.Promise.delay(5000);
      }
    }
  }
  return backendPrisma;
};

export const getCamundaPrisma = async (): Promise<CamundaPrisma> => {
  if (!camundaPrisma) {
    let isConnected = false;
    while (!isConnected) {
      try {
        camundaPrisma = new CamundaPrisma({
          datasources: {
            db: {
              url: process.env.CAMUNDA_DATABASE_URL,
            },
          },
        });

        await camundaPrisma.$connect();
        sysLog.info(`Prisma: successfully connected`);
        isConnected = true;
      } catch (e) {
        sysLog.error(`Prisma: ${e}`);
        await camundaPrisma.$disconnect();
        await BlueBird.Promise.delay(5000);
      }
    }
  }
  return camundaPrisma;
};

export const initPrisma = getBackendPrisma;

export const terminatePrisma = async (): Promise<void> => backendPrisma?.$disconnect();
