import getPaginatedESQuery from '$data/graphql/getPaginatedESQuery';
import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { getSdk } from '$service/generated/repoGqlTypes';

import { GetAllJournalsItem } from './getAllJournalsItemDto';

interface Parameters {
  limit: number;
  skip: number;
  title?: string;
  ids?: string[];
}

export const getJournalsDetail = async (
  parameters: Parameters,
  authorization: string,
): Promise<GetAllJournalsItem[]> => {
  const { ids, title, limit, skip } = parameters;
  const mustQuery: any[] = [{ match: { schema: 'Journal' } }];
  if (title) {
    mustQuery.push({
      multi_match: {
        query: title.toLocaleLowerCase(),
        fuzziness: 'AUTO',
        fields: ['title', '*'],
        minimum_should_match: '90%',
      },
    });
  }
  if (ids) {
    mustQuery.push({ terms: { _id: ids } });
  }

  const client = getGraphqlClient(authorization);
  const { getAllJournals } = getSdk(client);
  const result = await getAllJournals(getPaginatedESQuery(mustQuery, limit, skip));

  return result.search.items as GetAllJournalsItem[];
};
