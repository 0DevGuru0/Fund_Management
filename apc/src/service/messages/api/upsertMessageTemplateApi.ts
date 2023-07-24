import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { Role } from '$service/groups/Role';
import {
  MessageTemplateChannel,
  messageTemplateChannelDto,
} from '$service/messages/messageTemplateChannelDto';
import {
  messageTemplateDto,
  MessageTemplate,
} from '$service/messages/messageTemplateDto';
import { upsertMessageTemplate } from '$service/messages/upsertMessageTemplate';

import { Prisma } from '.prisma/backend-client';

interface Query {
  [key: string]: string | string[];
}

interface Body {
  templateId: string;
  body: string;
  channels: MessageTemplateChannel[];
}

const upsertMessageTemplateApi: ApiHandler<Body, MessageTemplate, Query> = async (
  req,
  res,
) => {
  const { templateId, body, channels } = req.body;
  const channelsJson = (channels as unknown) as Prisma.InputJsonValue;
  return upsertMessageTemplate({
    id: templateId,
    body,
    channels: channelsJson,
  });
};

export default withMiddleware(upsertMessageTemplateApi)({
  operationId: 'upsertMessageTemplate',
  description: 'create or replace message template by template id',
  method: 'PUT',
  roles: [Role.SystemAdmin],
  body: {
    type: 'object',
    properties: {
      templateId: { type: 'string' },
      body: { type: 'string' },
      channels: {
        type: 'array',
        items: messageTemplateChannelDto,
      },
    },
    required: ['templateId', 'body', 'channels'],
  },
  response: messageTemplateDto,
});
