import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getAllJournalsItemDto } from '$service/journals/getAllJournalsItemDto';
import {
  Result,
  getJournalsOfJournalGroup,
} from '$service/journalsOfJournalGroup/getJournalsOfJournalGroup';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

interface Query {
  journalGroupId: string;
  title: string;
  limit: string;
  skip: string;
  [key: string]: string | string[];
}

const getJournalsOfJournalGroupApi: ApiHandler<any, Result, Query> = async (req, res) => {
  const { limit, skip } = parseQueryLimitAndSkip(req.query);

  return getJournalsOfJournalGroup(
    { ...req.query, limit, skip },
    req.headers.authorization!,
  );
};

export default withMiddleware(getJournalsOfJournalGroupApi)({
  operationId: 'getJournalsOfJournalGroup',
  description: 'Get the list of journals for a journalGroup',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      journalGroupId: {
        type: 'string',
        format: 'uuid',
        openApiIn: 'path',
      },
      title: {
        type: 'string',
        openApiIn: 'query',
      },
      limit: { type: 'string', format: 'int32', openApiIn: 'query' },
      skip: { type: 'string', format: 'int32', openApiIn: 'query' },
    },
    required: ['journalGroupId'],
  },
  response: {
    type: 'object',
    properties: {
      journals: { type: 'array', items: getAllJournalsItemDto },
      count: { type: 'number' },
    },
  },
});
