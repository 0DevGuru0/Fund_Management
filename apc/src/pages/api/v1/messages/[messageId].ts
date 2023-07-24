import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { deleteMessageTemplate, Result } from '$service/messages/deleteMessageTemplate';

interface Query {
  messageId: string;
  [key: string]: string | string[];
}

const deleteMessageTemplateApi: ApiHandler<any, Result, Query> = async (req) => {
  const { messageId } = req.query;

  return deleteMessageTemplate(messageId);
};

export default withMiddleware(deleteMessageTemplateApi)({
  operationId: 'deleteMessageTemplate',
  description: 'deleting a message template ',
  method: 'DELETE',
  query: {
    type: 'object',
    properties: {
      messageId: {
        type: 'string',
        openApiIn: 'path',
      },
    },
    required: ['messageId'],
  },
  response: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
    },
  },
});
