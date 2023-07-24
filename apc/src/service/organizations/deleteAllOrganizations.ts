import elasticBulkDelete from '$service/doaj/bulkDelete';
import elasticBulkFetch from '$service/doaj/bulkFetch';
import {
  DeleteOrganizationsDocument,
  GetAllOrganizationsDocument,
} from '$service/generated/repoGqlTypes';

import { sysLog } from '$logger';

const deleteAllOrganizations = async (): Promise<void> => {
  try {
    sysLog.warn(
      `Deleting Organizations might cause Foreign-key constraint error on Journals Schema`,
    );

    sysLog.info(`Fetching the list of existing organizations ...`);
    const mustQuery = [{ match: { schema: 'Organization' } }];
    const allOrganizations = await elasticBulkFetch(
      GetAllOrganizationsDocument,
      mustQuery,
    );
    sysLog.info(`Found ${allOrganizations.numberOfResults} organizations in database`);

    const organizationIds: string[] = allOrganizations.finalItems.map((organization) => {
      return organization._id;
    });

    sysLog.info(`Deleting organizations ...`);
    const deletedOrganizations = await elasticBulkDelete(
      DeleteOrganizationsDocument,
      organizationIds,
      'Organization',
    );

    sysLog.info(`Deleted ${deletedOrganizations.length} organizations`);
  } catch (err) {
    sysLog.error(`Error while deleting organizations: ${err}`);
  }
};

export default deleteAllOrganizations;
