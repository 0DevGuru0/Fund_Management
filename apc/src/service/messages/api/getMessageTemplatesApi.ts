import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

import { getMessageTemplates, Result } from '../getMessageTemplates';
import { messageTemplateDto } from '../messageTemplateDto';

interface Query {
  limit: string;
  skip: string;
  id: string;
  search: string;
  [key: string]: string | string[];
}

const getMessageTemplatesApi: ApiHandler<any, Result, Query> = async (req) => {
  const { limit, skip } = parseQueryLimitAndSkip(req.query);

  return getMessageTemplates({
    ...req.query,
    limit,
    skip,
  });
};

export default withMiddleware(getMessageTemplatesApi)({
  operationId: 'getMessageTemplates',
  description: 'getting message templates ',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      limit: {
        type: 'string',
        openApiIn: 'query',
      },
      skip: {
        type: 'string',
        openApiIn: 'query',
      },
      id: {
        type: 'string',
        openApiIn: 'query',
      },
      search: {
        type: 'string',
        openApiIn: 'query',
      },
    },
  },
  response: {
    type: 'object',
    properties: {
      messageTemplates: {
        type: 'array',
        items: messageTemplateDto,
        nullable: true,
      },
      count: {
        type: 'integer',
        nullable: true,
      },
    },
  },
});
