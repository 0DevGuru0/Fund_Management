import { JSONSchemaType } from '$service/validator/ajvTypes';

import {
  MessageTemplateChannel,
  messageTemplateChannelDto,
} from './messageTemplateChannelDto';

import { MessageTemplate as TypeWeakMessageTemplate } from '.prisma/backend-client';

export type MessageTemplate = Omit<TypeWeakMessageTemplate, 'channels'> & {
  channels: MessageTemplateChannel[];
};

export const messageTemplateDto: JSONSchemaType<MessageTemplate> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    body: {
      type: 'string',
    },
    channels: {
      type: 'array',
      items: messageTemplateChannelDto,
    },
    createdAt: { type: 'object' },
    updatedAt: { type: 'object' },
  },
};
export type MessageTemplateInput = Omit<MessageTemplate, 'createdAt' | 'updatedAt'>;
export const messageTemplateInputDto: JSONSchemaType<MessageTemplateInput> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    body: {
      type: 'string',
    },
    channels: {
      type: 'array',
      items: messageTemplateChannelDto,
    },
  },
};
