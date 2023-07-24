import { GetServerSideProps } from 'next';

import ProcessInstanceDetails from '$application/components/pages/ProcessInstanceDetails';
import generateQueryString from '$application/lib/generateQueryString';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const processId = generateQueryString(ctx.query.processId);
  return {
    props: {
      pageLayout: 'Management',
      breadcrumbs: [
        {
          title: 'All Task',
          href: '/management/allTask',
        },
        {
          title: 'Application Details',
          href: '/management/process/',
        },
      ],
      processId,
    },
  };
};

export default ProcessInstanceDetails;
