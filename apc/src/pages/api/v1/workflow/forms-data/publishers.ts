import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { getSdk } from '$service/generated/repoGqlTypes';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

interface Query {
  publisherName: string;
  limit: string;
  skip: string;
  [key: string]: string | string[];
}

type Response = {
  title: string;
  id: string;
}[];

const publishers: ApiHandler<any, Response, Query> = async (req) => {
  const { publisherName } = req.query;
  const { limit, skip } = parseQueryLimitAndSkip(req.query);

  const query: any = {
    filter: [
      { term: { 'schema.keyword': 'Organization' } },
      { term: { 'Organization.type.keyword': 'Publisher' } },
    ],
  };

  if (publisherName) {
    query.must = [
      { multi_match: { query: publisherName, fields: ['title', 'title.suggestion'] } },
    ];
  }

  const variables = {
    limit,
    offset: skip,
    query: {
      bool: query,
    },
  };

  const client = getGraphqlClient(req.headers.authorization);

  const { getPublisher } = getSdk(client);

  const result = await getPublisher(variables);

  return result.search.items;
};

export default withMiddleware(publishers)({
  operationId: 'getPublishers',
  description: 'get publishers with filter on titles',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      publisherName: {
        type: 'string',
        openApiIn: 'query',
      },
      limit: { type: 'string', openApiIn: 'query', format: 'int32' },
      skip: { type: 'string', openApiIn: 'query', format: 'int32' },
    },
  },
  response: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
      },
      required: ['id', 'title'],
    },
    nullable: true,
  },
});
