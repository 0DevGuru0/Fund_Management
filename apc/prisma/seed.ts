import { PrismaClient } from '.prisma/backend-client';

const db = new PrismaClient();
export async function seed(): Promise<void> {
  await db.$queryRaw`SELECT 1`;
  // here we should seed our database with the real data

  await db.$disconnect();
}
