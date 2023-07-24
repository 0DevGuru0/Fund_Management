import { GetStaticProps } from 'next';

import MessageTemplates from '$application/components/pages/ManagementMessageTemplates';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description:
      'Manage all the outgoing messages of the system, Define channels for each message and use these messages in your process definition.',
    pageLayout: 'Management',
    breadcrumbs: [
      {
        title: 'Message Templates',
        href: '/management/message-templates',
      },
    ],
  },
});

export default MessageTemplates;
