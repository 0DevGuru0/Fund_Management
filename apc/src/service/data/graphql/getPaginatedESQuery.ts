import { QuerySearchArgs } from '$service/generated/repoGqlTypes';

export interface ElasticMustQuery {
  match: Record<string, string>;
}

const getPaginatedESQuery = (
  mustQuery: ElasticMustQuery[],
  limit: number = 10,
  offset: number = 0,
): QuerySearchArgs => {
  return {
    query: {
      bool: {
        must: mustQuery,
      },
    },
    limit,
    offset,
  };
};

export default getPaginatedESQuery;
