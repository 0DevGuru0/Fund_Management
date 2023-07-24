import { getJournalsDetail } from '$service/journals/getJournalsDetail';
import { sysLog } from '$service/logger';

const bulkVolume = 500;

export const issnToJournalId = async (
  issnToJcr: Record<string, string>,
  authorization: string,
): Promise<Record<string, string>> => {
  const idToJcr = {};

  let skip = 0;
  const constantTrue = true;
  while (constantTrue) {
    const journals = await getJournalsDetail(
      {
        limit: bulkVolume,
        skip,
      },
      authorization,
    );
    for (const journal of journals) {
      if (issnToJcr[journal.printISSN!]) {
        idToJcr[journal._id] = issnToJcr[journal.printISSN!];
      }
      if (issnToJcr[journal.onlineISSN!]) {
        idToJcr[journal._id] = issnToJcr[journal.onlineISSN!];
      }
    }

    skip += bulkVolume;
    sysLog.info(
      `#${skip} journals checked - #${Object.keys(idToJcr).length} journal issn founded`,
    );

    if (journals.length < bulkVolume) {
      break;
    }
  }

  return idToJcr;
};
