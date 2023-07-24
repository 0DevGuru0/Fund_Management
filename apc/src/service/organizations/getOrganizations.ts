import { GetOrganizationsType } from '$application/lib/generated/apcApi.schemas';
import getPaginatedESQuery from '$data/graphql/getPaginatedESQuery';
import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { getSdk } from '$service/generated/repoGqlTypes';

import { GetAllOrganizationsItem } from './getAllOrganizationsItemDto';

export interface Parameters {
  limit: number;
  skip: number;
  ids?: string[];
  title?: string;
  type?: GetOrganizationsType;
}

export const getOrganizations = async (
  parameters: Parameters,
  authToken?: string,
): Promise<GetAllOrganizationsItem[]> => {
  const { ids, title, type, limit, skip } = parameters;
  const mustQuery: any[] = [{ match: { schema: `Organization` } }];
  if (ids) {
    mustQuery.push({ terms: { _id: ids } });
  }
  if (title) {
    mustQuery.push({ match: { title } });
  }
  if (type) {
    mustQuery.push({ match: { 'Organization.type': type } });
  }

  const client = getGraphqlClient(authToken);
  const { getAllOrganizations } = getSdk(client);
  const result = await getAllOrganizations(getPaginatedESQuery(mustQuery, limit, skip));

  return result.search.items as GetAllOrganizationsItem[];
};
