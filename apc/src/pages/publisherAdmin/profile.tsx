import { GetStaticProps } from 'next';

import UserProfile from '$application/components/pages/UserProfile';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    pageLayout: 'PublisherAdmin',
    breadcrumbs: [
      {
        title: 'Account',
        href: '/publisherAdmin/profile',
      },
    ],
  },
});

export default UserProfile;
