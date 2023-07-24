import React from 'react';

import DownloadSVG from '$application/assets/icons/download.svg';
import { StoryFC } from '$application/components/StoryFC';

import IconButton, { IconButtonProps } from './IconButton';

export default {
  title: 'Atoms / Buttons / IconButton',
  component: IconButton,
};

export const Sample: StoryFC<IconButtonProps> = (args) => {
  return <IconButton {...args} />;
};

Sample.args = {
  icon: <DownloadSVG />,
  variant: 'Contained',
  color: 'Normal',
  title: 'Tooltip',
};

const zeplinLink =
  'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac80790f541d73aa599ed2';

Sample.parameters = {
  zeplinLink,
};
