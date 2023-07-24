import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description:
      'Dashboard is where you can find your calendar and overal chart that illustrate your current tasks status.',
    pageLayout: 'FundManager',
  },
});

export default ComingSoon;
