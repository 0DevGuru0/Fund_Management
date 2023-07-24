import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { Notification, NotificationProps } from './Notification';

export default {
  title: 'Templates / Researcher / Header',
  component: Notification,
  parameters: { background: { noPadding: true } },
};

export const NotificationComponent: StoryFC<NotificationProps> = (args) => {
  return <Notification {...args} />;
};

NotificationComponent.args = {
  status: 'new',
};

NotificationComponent.parameters = {
  zeplinLink: [
    {
      name: 'Researcher',
      link:
        'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1fa8087bc552669e49ed2',
    },
  ],
};
