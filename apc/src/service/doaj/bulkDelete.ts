import { DocumentNode } from 'graphql';
import { union } from 'lodash';
import getConfig from 'next/config';

import { getGraphqlClient } from '$data/graphql/graphQLClient';

import { sysLog } from '$logger';

const { serverRuntimeConfig } = getConfig();

const authorization = `Bearer ${serverRuntimeConfig.REPO_API_KEY}`;

const bulkSize: number = 100;

const elasticBulkDelete = async (
  query: DocumentNode,
  items: string[],
  schema: string,
): Promise<any> => {
  let response: any[] = [];

  for (let startIndex = 0; startIndex < items.length; startIndex += bulkSize) {
    sysLog.info(`Deleting item (chunk ${startIndex} to ${startIndex + bulkSize}) ...`);

    const slicedArray = items.slice(startIndex, startIndex + bulkSize);
    const deletedItems = await getGraphqlClient(authorization).request(query, {
      ids: slicedArray,
    });

    // TODO: response may contain several queries, we will need to fetch them using map
    switch (schema) {
      case 'Organization':
        response = union(response, deletedItems.deleteOrganizations);
        break;
      case 'Journal':
        response = union(response, deletedItems.deleteJournals);
    }

    // Wait before next query
    await new Promise((value) => setTimeout(value, 1000));
  }

  return response;
};

export default elasticBulkDelete;
