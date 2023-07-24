import { GetServerSideProps } from 'next';

import JournalGroupDetails from '$application/components/pages/JournalGroupDetails';
import generateQueryString from '$application/lib/generateQueryString';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const journalGroupId = generateQueryString(ctx.query.journalGroupId);
  return {
    props: {
      pageLayout: 'Management',
      breadcrumbs: [
        {
          title: 'Journals',
          href: '/management/journals',
        },
        {
          title: 'Group Details',
          href: '/management/journal-group',
        },
      ],
      journalGroupId,
    },
  };
};

export default JournalGroupDetails;
