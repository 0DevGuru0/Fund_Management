import { DocumentNode } from 'graphql';
import { union } from 'lodash';
import getConfig from 'next/config';

import { getGraphqlClient } from '$data/graphql/graphQLClient';

import { sysLog } from '$logger';

const { serverRuntimeConfig } = getConfig();

const authorization = `Bearer ${serverRuntimeConfig.REPO_API_KEY}`;

const bulkSize: number = 100;

const elasticBulkInsert = async (
  query: DocumentNode,
  finalItemsList: any[],
  schemaName: string,
): Promise<any> => {
  let response: any[] = [];

  for (
    let startIndex = 0, endIndex = finalItemsList.length;
    startIndex < endIndex;
    startIndex += bulkSize
  ) {
    sysLog.info(`Inserting item (chunk ${startIndex} to ${startIndex + bulkSize}) ...`);
    const slicedArray = finalItemsList.slice(startIndex, startIndex + bulkSize);
    const gqlClient = getGraphqlClient(authorization);
    const insertedItems = await gqlClient.request(query, {
      items: slicedArray,
    });

    switch (schemaName) {
      case 'Organization':
        response = union(response, insertedItems.createOrganizations);
        break;
      case 'Journal':
        response = union(response, insertedItems.createJournals);
    }

    // Wait before next query
    await new Promise((value) => setTimeout(value, 2000));
  }

  return response;
};

export default elasticBulkInsert;
