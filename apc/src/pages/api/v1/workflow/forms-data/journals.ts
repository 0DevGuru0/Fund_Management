import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { getSdk } from '$service/generated/repoGqlTypes';
import {
  GetJournalsByPublisherId,
  getJournalsByPublisherIdDto,
} from '$service/journals/getJournalsByPublisherIdDto';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

interface Query {
  title: string;
  publisherId: string;
  limit: string;
  skip: string;
  [key: string]: string | string[];
}

const journals: ApiHandler<any, GetJournalsByPublisherId[], Query> = async (req) => {
  const { title, publisherId } = req.query;
  const { limit, skip } = parseQueryLimitAndSkip(req.query);

  const query: any = {
    filter: [
      {
        term: { 'schema.keyword': 'Journal' },
      },
      {
        term: { 'Journal.publisher': publisherId },
      },
    ],
  };

  if (title) {
    query.must = [
      { multi_match: { query: title, fields: ['title', 'title.suggestion'] } },
    ];
  }

  const variables = {
    limit,
    offset: skip,
    sort: [{ _id: 'asc' }],
    query: {
      bool: query,
    },
  };

  const client = getGraphqlClient(req.headers.authorization);

  const { getJournalsByPublisherId } = getSdk(client);

  const result = await getJournalsByPublisherId(variables);

  return result.search.items as GetJournalsByPublisherId[];
};

export default withMiddleware(journals)({
  operationId: 'getJournals',
  description: 'get journals by publisher id',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        openApiIn: 'query',
      },
      publisherId: {
        type: 'string',
        openApiIn: 'query',
      },
      limit: { type: 'string', openApiIn: 'query', format: 'int32' },
      skip: { type: 'string', openApiIn: 'query', format: 'int32' },
    },
    required: ['publisherId'],
  },
  response: {
    type: 'array',
    items: getJournalsByPublisherIdDto,
    nullable: true,
  },
});
