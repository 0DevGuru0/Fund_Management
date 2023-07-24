import React from 'react';

import { action } from '@storybook/addon-actions';

import { StoryFC } from '$application/components/StoryFC';

import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';

export default {
  title: 'Molecules / Breadcrumb',
  component: Breadcrumb,
};

export const SingleHistory: StoryFC<BreadcrumbProps> = (args) => {
  return <Breadcrumb {...args} />;
};

SingleHistory.args = {
  items: [
    {
      title: 'dashboard',
      onClick: () => action('dashboard is clicked'),
    },
    {
      title: 'inbox',
      onClick: () => action('inbox is clicked'),
    },
  ],
};

export const MultipleHistories = SingleHistory.bind({});

MultipleHistories.args = {
  items: [
    {
      title: 'dashboard',
      onClick: () => action('dashboard is clicked'),
    },
    {
      title: 'mid step one',
      onClick: () => action('mid step one is clicked'),
    },
    {
      title: 'mid step two',
      onClick: () => action('mid step two is clicked'),
    },
    {
      title: 'mid step three',
      onClick: () => action('mid step three is clicked'),
    },
    {
      title: 'inbox',
      onClick: () => action('inbox is clicked'),
    },
  ],
};

const zeplinLink =
  'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1fa8087bc552669e49ed2';

SingleHistory.parameters = {
  zeplinLink,
};

MultipleHistories.parameters = {
  zeplinLink,
};
