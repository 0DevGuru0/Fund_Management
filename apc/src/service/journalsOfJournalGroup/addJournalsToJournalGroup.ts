import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';
import { checkItemsExistence } from '$service/repository/checkItemsExistence';

import { JournalGroup } from '.prisma/backend-client';

interface Parameters {
  journalIds: string[];
  journalGroupId: string;
  batchId: string;
  assignedBy: string;
}

interface Result {
  journalGroup: JournalGroup;
  additionCount: number;
}

export const addJournalsToJournalGroup = async (
  parameters: Parameters,
  authorization: string,
): Promise<Result> => {
  const { journalIds, journalGroupId, batchId, assignedBy } = parameters;
  const journalsCount = journalIds.length;

  const prisma = await getBackendPrisma();

  const [journalGroup, { notFoundIds, total }] = await Promise.all([
    prisma.journalGroup.findUnique({
      where: {
        id: journalGroupId,
      },
      select: {
        id: true,
      },
    }),
    checkItemsExistence('Journal', journalIds, authorization),
  ]);

  const errors: { message: string; notFoundIds?: any[] }[] = [];
  if (total !== journalsCount) {
    errors.push({
      message: 'some of the provided journals does not exist in our repository',
      notFoundIds,
    });
  }
  if (journalGroup == null) {
    errors.push({ message: 'such journalGroup does not exist' });
  }
  if (errors.length > 0) {
    throw new NotFoundError(undefined, { extensions: errors });
  }

  const [journalsOfJournalGroup, updatedJournalGroup] = await prisma.$transaction([
    prisma.journalsOfJournalGroup.createMany({
      data: journalIds.map((journalId) => ({
        journalId,
        journalGroupId,
        batchId,
        assignedBy,
      })),
    }),
    prisma.journalGroup.update({
      where: {
        id: journalGroupId,
      },
      data: {
        journalsCount: {
          increment: journalsCount,
        },
      },
    }),
  ]);

  return {
    journalGroup: updatedJournalGroup,
    additionCount: journalsOfJournalGroup.count,
  };
};
