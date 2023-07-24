import { map } from 'lodash';

import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { getSdk } from '$service/generated/repoGqlTypes';
import { sysLog } from '$service/logger';

const bulkVolume = 200;

export const updateJcrById = async (
  idToJcr: Record<string, string>,
  authorization: string,
): Promise<void> => {
  const items = map(idToJcr, (value, prop) => ({
    jcrQuartile: value,
    _id: prop,
  }));

  const client = getGraphqlClient(authorization);
  const { updateJournals } = getSdk(client);

  for (let start = 0; start < items.length; start += bulkVolume) {
    await updateJournals({
      items: items.slice(start, start + bulkVolume),
    });
    sysLog.info(`#${start} journals updated - #${items.length - start} to go`);
  }
};
