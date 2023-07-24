import { getJournalsDetail } from '$service/journals/getJournalsDetail';
import { sysLog } from '$service/logger';

const bulkVolume = 500;

export const issnToJournalId = async (
  issnToSjr: Record<string, string>,
  authorization: string,
): Promise<Record<string, string>> => {
  const idToSjr = {};

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
      if (issnToSjr[journal.printISSN!]) {
        idToSjr[journal._id] = issnToSjr[journal.printISSN!];
      }
      if (issnToSjr[journal.onlineISSN!]) {
        idToSjr[journal._id] = issnToSjr[journal.onlineISSN!];
      }
    }

    skip += bulkVolume;
    sysLog.info(
      `#${skip} journals checked - #${Object.keys(idToSjr).length} journal issn founded`,
    );

    if (journals.length < bulkVolume) {
      break;
    }
  }

  return idToSjr;
};
