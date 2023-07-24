import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { Sample } from './StoreSample';

export default {
  title: 'Samples / StateManagement / Zustand',
  component: Sample,
};

export const SampleDefault: StoryFC = () => <Sample />;

SampleDefault.parameters = {
  zeplinLink: '',
};
