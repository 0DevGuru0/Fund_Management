import Handlebars from 'handlebars';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';

import { MessageTemplateChannel } from '../messageTemplateChannelDto';
import { MessageAudience, sendEmail } from '../sendEmail';

interface Body {
  templateId: string;
  audience: MessageAudience[];
  variables: Record<string, any>;
}

const messages: ApiHandler<Body, string, never> = async (req, res) => {
  const { templateId, audience, variables } = req.body;
  const prisma = await getBackendPrisma();

  const template = await prisma.messageTemplate.findUnique({
    where: {
      id: templateId,
    },
  });
  if (!template) {
    throw new NotFoundError(`Could not find message template with this id`);
  }

  const body = Handlebars.compile(template.body)(variables);
  const channels = (template.channels as unknown) as MessageTemplateChannel[];
  const activeChannels = channels.filter(({ isActive }) => isActive);

  for (const channel of activeChannels) {
    switch (channel.type) {
      case 'email':
        sendEmail(audience, body, channel, variables);
        break;
      default:
        // eslint-disable-next-line no-console
        console.error(`Channel type ${channel.type} is not supported`);
        break;
    }
  }

  return `All Messages Have Sent`;
};

export default withMiddleware(messages)({
  operationId: 'sendMessage',
  description: 'Send Message Using a Template',
  method: 'POST',
  isPublic: true,
  body: {
    type: 'object',
    required: ['templateId', 'audience'],
    properties: {
      templateId: { type: 'string' },
      audience: {
        type: 'array',
        description:
          'The address of the message audience. This has a config for each template channel. e.g. if email channel is enabled an email property should be defined for each audience.',
        items: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', nullable: true },
            phone: { type: 'string', nullable: true },
            username: { type: 'string', nullable: true },
          },
        },
      },
      variables: {
        type: 'object',
        additionalProperties: true,
      },
    },
  },
  response: {
    type: 'string',
  },
});
