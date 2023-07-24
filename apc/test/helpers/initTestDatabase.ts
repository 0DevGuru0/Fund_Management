import { exec } from 'child_process';
import { promisify } from 'util';

import getConfig from 'next/config';
import { v4 } from 'uuid';

const { serverRuntimeConfig } = getConfig();

const execp = promisify(exec);

export default async (): Promise<void> => {
  const baseDatabaseUrl = serverRuntimeConfig.DATABASE_URL;
  const baseDatabaseName = getDatabaseNameFromUrl(baseDatabaseUrl);

  if (!baseDatabaseUrl || !baseDatabaseName) {
    console.error('Please provide a correct database url');
    console.error('The current URL is: ', baseDatabaseUrl);
    process.exit(1);
  }

  const generatedDatabaseName = expect
    .getState()
    .testPath.match(/^(.*)\/(.*)\.(.*)\.ts$/)?.[2];

  // Employ the generated database for each test
  const databaseUrl = baseDatabaseUrl.replace(
    `/${baseDatabaseName}`,
    `/${generatedDatabaseName}-test-${v4()}`,
  );
  process.env.DATABASE_URL = databaseUrl;
  serverRuntimeConfig.DATABASE_URL = databaseUrl;

  await execp(`prisma migrate deploy --schema ./prisma/backendDatabase/schema.prisma`, {
    env: { ...process.env },
  });
};

const getDatabaseNameFromUrl = (url?: string): string | undefined =>
  url?.match(/:(\d+)\/(.*?)(\?.*)?$/)?.[2];
