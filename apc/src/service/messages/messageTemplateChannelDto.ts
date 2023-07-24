import { JSONSchemaType } from '$service/validator/ajvTypes';

export type MessageTemplateChannel = (
  | EmailTemplateConfig
  | NotificationTemplateConfig
) & { isActive: boolean };

export interface EmailTemplateConfig {
  type: 'email';
  subject: string;
  from: string;
  title?: string;
  cc?: string[];
  bcc?: string[];
}

export interface NotificationTemplateConfig {
  type: 'notification';
  image: string;
}

export const messageTemplateChannelDto: JSONSchemaType<MessageTemplateChannel> = {
  type: 'object',
  allOf: [
    {
      oneOf: [
        {
          properties: {
            type: {
              type: 'string',
              enum: ['email'],
            },
            subject: {
              type: 'string',
            },
            title: {
              type: 'string',
              nullable: true,
            },
            from: {
              type: 'string',
            },
            cc: {
              type: 'array',
              items: {
                type: 'string',
              },
              nullable: true,
            },
            bcc: {
              type: 'array',
              items: {
                type: 'string',
              },
              nullable: true,
            },
          },
          required: ['type', 'subject', 'from'],
        },
        {
          properties: {
            type: {
              type: 'string',
              enum: ['notification'],
            },
            image: {
              type: 'string',
            },
          },
          required: ['type'],
        },
      ],
    },
    {
      properties: {
        isActive: {
          type: 'boolean',
        },
      },
      required: ['isActive'],
    },
  ],
};
