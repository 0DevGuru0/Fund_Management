import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { Researcher, ResearcherProps } from './Researcher';

export default {
  title: 'Templates / Researcher / Header',
  component: Researcher,
  parameters: { background: { noPadding: true } },
};

export const User: StoryFC<ResearcherProps> = (args) => {
  return <Researcher {...args} />;
};

User.args = {
  name: 'Hamid Reza Khosravi',
  image: '/defaultUser.png',
  userName: 'Hamid_Reza_Avid',
};

User.parameters = {
  zeplinLink: [
    {
      name: 'Researcher',
      link:
        'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1fa8087bc552669e49ed2',
    },
  ],
};
