import { getBackendPrisma } from '$data/prisma';
import { GetAllJournalsItem } from '$service/journals/getAllJournalsItemDto';
import { getJournalsDetail } from '$service/journals/getJournalsDetail';

interface Parameters {
  journalGroupId: string;
  title?: string;
  skip: number;
  limit: number;
}
export interface Result {
  journals: GetAllJournalsItem[];
  count: number;
}
export const getJournalsOfJournalGroup = async (
  parameters: Parameters,
  authorization: string,
): Promise<Result> => {
  const { journalGroupId, title, skip, limit } = parameters;
  const prisma = await getBackendPrisma();

  const journalsOfJournalGroup = await prisma.journalsOfJournalGroup.findMany({
    where: {
      journalGroupId,
    },
  });
  const journalIds = journalsOfJournalGroup.map((journal) => journal.journalId);

  const count = journalIds.length;

  const journals = await getJournalsDetail(
    {
      ids: journalIds,
      title,
      skip,
      limit,
    },
    authorization,
  );
  return { journals, count };
};
