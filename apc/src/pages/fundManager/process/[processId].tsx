import { GetServerSideProps } from 'next';

import ProcessInstanceDetails from '$application/components/pages/ProcessInstanceDetails';
import generateQueryString from '$application/lib/generateQueryString';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const processId = generateQueryString(ctx.query.processId);
  return {
    props: {
      pageLayout: 'FundManager',
      breadcrumbs: [
        {
          title: 'Inbox',
          href: '/fundManager/inbox',
        },
        {
          title: 'Application Details',
          href: '/fundManager/process/',
        },
      ],
      processId,
    },
  };
};

export default ProcessInstanceDetails;
