import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';

import { JournalGroup } from '.prisma/backend-client';

interface Parameters {
  journalIds: string[];
  journalGroupId: string;
}

interface Result {
  journalGroup: JournalGroup;
  deletionCount: number;
}

export const removeJournalsFromJournalGroup = async (
  parameters: Parameters,
): Promise<Result> => {
  const { journalIds, journalGroupId } = parameters;
  const journalsCount = journalIds.length;
  const prisma = await getBackendPrisma();

  const journalMemberships = await prisma.journalsOfJournalGroup.findMany({
    where: {
      journalGroupId,
      OR: journalIds.map((journalId) => ({ journalId })),
    },
  });
  if (journalMemberships.length !== journalsCount) {
    throw new NotFoundError(
      'some of the provided journals are not members of the journalGroup',
    );
  }

  const journalGroup = await prisma.journalGroup.findUnique({
    where: {
      id: journalGroupId,
    },
  });
  const [journalsOfJournalGroup, updatedJournalGroup] = await prisma.$transaction([
    prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId,
        OR: journalIds.map((journalId) => ({ journalId })),
      },
    }),
    prisma.journalGroup.update({
      where: {
        id: journalGroupId,
      },
      data: {
        journalsCount: {
          set: journalGroup?.journalsCount! - journalsCount,
        },
      },
    }),
  ]);

  return {
    journalGroup: updatedJournalGroup,
    deletionCount: journalsOfJournalGroup.count,
  };
};
