import elasticBulkDelete from '$service/doaj/bulkDelete';
import elasticBulkFetch from '$service/doaj/bulkFetch';
import {
  DeleteJournalsDocument,
  GetAllJournalsDocument,
} from '$service/generated/repoGqlTypes';

import { sysLog } from '$logger';

const deleteAllJournals = async (): Promise<void> => {
  try {
    sysLog.info(`Fetching the list of existing journals ...`);

    const mustQuery = [{ match: { schema: 'Journal' } }];
    const allJournals = await elasticBulkFetch(GetAllJournalsDocument, mustQuery);
    sysLog.info(`Found ${allJournals.numberOfResults} journals in database`);

    const journalIds: string[] = allJournals.finalItems.map((journal) => {
      return journal._id;
    });

    sysLog.info(`Deleting journals ...`);
    const deletedJournals = await elasticBulkDelete(
      DeleteJournalsDocument,
      journalIds,
      'Journal',
    );

    sysLog.info(`Deleted ${deletedJournals.length} journals`);
  } catch (err) {
    sysLog.error(`Error while deleting journals: ${err}`);
  }
};

export default deleteAllJournals;
