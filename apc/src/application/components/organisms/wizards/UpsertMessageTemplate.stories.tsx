import React from 'react';

import { rest } from 'msw';

import { StoryFC } from '$application/components/StoryFC';
import {
  GetMessageTemplates200,
  GetMessageTemplates200MessageTemplatesItem,
} from '$application/lib/generated/apcApi.schemas';
import { createServerAddress } from '$application/utils/createServerAddress';

import { UpsertMessageTemplate } from './UpsertMessageTemplate';

export default {
  title: 'Organisms / Wizards / Upsert Message Template',
  component: UpsertMessageTemplate,
  parameters: { background: { noPadding: true } },
};

export const EditMessageTemplateStory: StoryFC = () => (
  <UpsertMessageTemplate messageTemplateId="Test ID" />
);

const messagesUrl = createServerAddress('messages');

const zeplinLink = [
  {
    name: '1. General Info',
    link:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61122a0701d69c134266e8b5',
  },
  {
    name: '2. Channels',
    link:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61122a484c399b166d083057',
  },
  {
    name: '3. Success',
    link:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61122a5255260017b816d88e',
  },
];

EditMessageTemplateStory.parameters = {
  zeplinLink,
  msw: [
    rest.get<any, GetMessageTemplates200>(messagesUrl, (req, res, ctx) => {
      const data: GetMessageTemplates200 = {
        count: 0,
        messageTemplates: [
          {
            body: 'Sample Template',
            id: req.url.searchParams.get('id')!,
            channels: [
              {
                subject: 'new Message template',
                from: 'John',
                isActive: true,
                type: 'email',
                title: 'Sample Title',
              },
            ],
          },
        ],
      };

      return res(ctx.delay(500), ctx.json(data));
    }),
    rest.put<GetMessageTemplates200MessageTemplatesItem>(messagesUrl, (req, res, ctx) =>
      res(ctx.delay(1000), ctx.json(req.body)),
    ),
  ],
};

export const CreateMessageTemplateStory: StoryFC = () => <UpsertMessageTemplate />;

CreateMessageTemplateStory.parameters = {
  zeplinLink,
  msw: [
    rest.put<GetMessageTemplates200MessageTemplatesItem>(messagesUrl, (req, res, ctx) =>
      res(ctx.delay(1000), ctx.json(req.body)),
    ),
  ],
};
