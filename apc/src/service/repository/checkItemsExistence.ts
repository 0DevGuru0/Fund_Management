import { difference } from 'lodash';

import getPaginatedESQuery from '$data/graphql/getPaginatedESQuery';
import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { getSdk } from '$service/generated/repoGqlTypes';

interface Result {
  notFoundIds: string[];
  total: number;
}

export const checkItemsExistence = async (
  type: string,
  ids: string[],
  authorization: string,
): Promise<Result> => {
  const mustQuery: any[] = [{ term: { 'schema.keyword': type } }];
  if (ids) {
    mustQuery.push({ terms: { _id: ids } });
  }

  const limit = ids.length;
  const skip = 0;

  const client = getGraphqlClient(authorization);
  const { getItemsById } = getSdk(client);
  const result = await getItemsById(getPaginatedESQuery(mustQuery, limit, skip));

  const total = result.search.total;
  const repoIds = result.search.items.map(({ _id }) => _id);
  if (total !== ids.length) {
    return {
      notFoundIds: difference(ids, repoIds),
      total,
    };
  }

  return {
    notFoundIds: [],
    total,
  };
};
