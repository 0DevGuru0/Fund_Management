import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { ShowStore } from './ShowStore';

export default {
  title: 'Samples / StateManagement / Jotai',
  component: ShowStore,
};

export const ShowStoreDefault: StoryFC = () => <ShowStore />;

ShowStoreDefault.parameters = {
  zeplinLink: '',
};
