import { getBackendPrisma } from '$data/prisma';

import { MessageTemplate } from './messageTemplateDto';

import { Prisma } from '.prisma/backend-client';

export const upsertMessageTemplate = async (
  messageTemplate: Prisma.MessageTemplateCreateInput,
): Promise<MessageTemplate> => {
  const { id, body, channels } = messageTemplate;
  const prisma = await getBackendPrisma();

  const upsertedMessageTemplate = await prisma.messageTemplate.upsert({
    create: messageTemplate,
    where: {
      id,
    },
    update: {
      body,
      channels,
    },
  });

  return (upsertedMessageTemplate as unknown) as MessageTemplate;
};
