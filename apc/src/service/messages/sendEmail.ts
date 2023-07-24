import Handlebars from 'handlebars';
import getConfig from 'next/config';
import nodemailer from 'nodemailer';

import genericTemplate from './emailTemplates/generic.html';
import { EmailTemplateConfig } from './messageTemplateChannelDto';

export interface MessageAudience {
  email?: string;
  phone?: string;
  username?: string;
}

const { serverRuntimeConfig } = getConfig();

const transport = nodemailer.createTransport({
  host: 'email-smtp.eu-west-1.amazonaws.com', // aws smtp address
  port: 465,
  secure: true,
  auth: {
    user: serverRuntimeConfig.SMTP_USER,
    pass: serverRuntimeConfig.SMTP_PASSWORD,
  },
});

export const sendEmail = async (
  audience: MessageAudience[],
  body: string,
  channelConfig: EmailTemplateConfig,
  variables: Record<string, any>,
): Promise<void> => {
  const [subject, from, title] = [
    channelConfig.subject,
    channelConfig.from,
    channelConfig.title,
  ].map((data) => (data ? Handlebars.compile(data)(variables) : data));

  const [cc, bcc] = [channelConfig.cc, channelConfig.bcc].map((data) =>
    data ? data?.map((subData) => Handlebars.compile(subData)(variables)) : data,
  );

  const html = Handlebars.compile(genericTemplate)({
    frontendServerAddress: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
    feedbackEmail: 'support@iknito.com',
    title,
    body,
    ...variables,
  });

  await transport.sendMail({
    from,
    to: audience.map(({ email }) => email!),
    cc,
    bcc,
    subject,
    html,
  });
};
