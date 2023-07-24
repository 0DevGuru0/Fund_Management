import { GetServerSideProps } from 'next';

import ProcessInstanceDetails from '$application/components/pages/ProcessInstanceDetails';
import generateQueryString from '$application/lib/generateQueryString';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const processId = generateQueryString(ctx.query.processId);
  return {
    props: {
      pageLayout: 'FundFinancialManager',
      breadcrumbs: [
        {
          title: 'Inbox',
          href: '/fundFinancialManager/inbox',
        },
        {
          title: 'Application Details',
          href: '/fundFinancialManager/process/',
        },
      ],
      processId,
    },
  };
};

export default ProcessInstanceDetails;
