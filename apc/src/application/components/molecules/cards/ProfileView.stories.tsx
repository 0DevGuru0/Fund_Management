import { StoryFC } from '$application/components/StoryFC';

import { ProfileView, ProfileViewProps } from './ProfileView';

export default {
  title: 'Molecules / Cards / ProfileView',
  component: ProfileView,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c9cbf0ceea1725ecaa2a',
  },
};

export const Default: StoryFC<ProfileViewProps> = ProfileView;

Default.args = {
  userId: '',
  profile: {
    userName: 'maorethians',
    fullName: 'Moein Nasr',
    profileImageSrc: '/emailAvatarPlaceholder.png',
    email: 'moein.nasr@avidarvand.com',
    isEmailVerified: true,
    orcid: '0000-0002-1825-0097',
  },
};
