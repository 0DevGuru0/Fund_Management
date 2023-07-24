import { GetStaticProps } from 'next';

import ComingSoon from '$application/components/pages/ComingSoonGeneral';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    description: 'Find the best journal with best funders using our Journal Finder.',
    pageLayout: 'Researcher',
  },
});

export default ComingSoon;
