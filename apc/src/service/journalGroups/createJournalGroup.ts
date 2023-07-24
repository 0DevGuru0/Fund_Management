import { GetOrganizationsType } from '$application/lib/generated/apcApi.schemas';
import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';
import { getOrganizations } from '$service/organizations/getOrganizations';

import { JournalGroup } from '.prisma/backend-client';

interface Parameters {
  fundId: string;
  publisherId: string;
  title: string;
  createdBy: string;
}

export const createJournalGroup = async (
  parameters: Parameters,
  authorization: string,
): Promise<JournalGroup> => {
  const { fundId, publisherId, title, createdBy } = parameters;
  const prisma = await getBackendPrisma();

  const [funds, publishers] = await Promise.all([
    getOrganizations(
      {
        limit: 1,
        skip: 0,
        ids: [fundId],
        type: GetOrganizationsType.Fund,
      },
      authorization,
    ),
    getOrganizations(
      {
        limit: 1,
        skip: 0,
        ids: [publisherId],
        type: GetOrganizationsType.Publisher,
      },
      authorization,
    ),
  ]);
  const errors: string[] = [];
  if (funds.length === 0) {
    errors.push('such fund does not exist in our repository');
  }
  if (publishers.length === 0) {
    errors.push('such publisher does not exist in our repository');
  }
  if (errors.length > 0) {
    throw new NotFoundError(undefined, { extensions: errors });
  }

  return prisma.journalGroup.create({
    data: {
      title,
      fundId,
      publisherId,
      journalsCount: 0,
      createdBy,
    },
  });
};
