import { GetServerSideProps } from 'next';

import ManagementMessageTemplateDetails from '$application/components/pages/ManagementMessageTemplateDetails';
import generateQueryString from '$application/lib/generateQueryString';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const messageTemplateId = generateQueryString(ctx.query.messageTemplateId);
  return {
    props: {
      pageLayout: 'Management',
      breadcrumbs: [
        {
          title: 'Message Templates',
          href: '/management/messageTemplates',
        },
        {
          title: 'Message Template Details',
          href: '/management/message-templates',
        },
      ],
      messageTemplateId,
    },
  };
};

export default ManagementMessageTemplateDetails;
