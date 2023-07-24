import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { ErrorPage, ErrorPageProps } from './ErrorPage';

export default {
  title: 'Molecules / Error',
  component: ErrorPage,
};

export const Default: StoryFC<ErrorPageProps> = (args) => {
  return <ErrorPage {...args} />;
};

Default.args = {
  errorCode: '404',
  description: 'Unfortunately, some errors occurred.',
  redirectPath: '/',
};
