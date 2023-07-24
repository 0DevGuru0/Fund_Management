import { DocumentNode } from 'graphql';
import { differenceWith, isEqual, union } from 'lodash';
import getConfig from 'next/config';

import { getGraphqlClient } from '$data/graphql/graphQLClient';

import getPaginatedESQuery from '../data/graphql/getPaginatedESQuery';

import { sysLog } from '$logger';

const { serverRuntimeConfig } = getConfig();

const authorization = `Bearer ${serverRuntimeConfig.REPO_API_KEY}`;

const elasticBulkFetch = async (query: DocumentNode, mustQuery: any): Promise<any> => {
  let isFinished = false;
  let numberOfResults = 0;
  let offset: number = 0;
  const limit: number = 50;
  let searchQuery;
  let currentPageResults = [];
  let previousPageResults = [];
  let finalItems: any[] = [];

  while (!isFinished) {
    sysLog.info(`Fetching items (${offset} to ${offset + limit}) ...`);

    searchQuery = await getGraphqlClient(authorization).request(
      query,
      getPaginatedESQuery(mustQuery, limit, offset),
    );

    currentPageResults = searchQuery.search.items;

    const compareResults = differenceWith(
      currentPageResults,
      previousPageResults,
      isEqual,
    );

    if (compareResults.length === 0) {
      // current and previous page items are the same (no more items to fetch)
      isFinished = true;
      sysLog.info(`No new items to fetch!`);
    } else {
      finalItems = union(finalItems, currentPageResults);
      previousPageResults = searchQuery.search.items;
      offset += limit;
    }

    // Wait before next query
    await new Promise((value) => setTimeout(value, 2000));
  }

  numberOfResults = searchQuery.search.total;

  return { numberOfResults, finalItems };
};

export default elasticBulkFetch;
