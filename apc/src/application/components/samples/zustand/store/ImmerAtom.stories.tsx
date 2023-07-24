import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { ImmerAtom } from './ImmerAtom';

export default {
  title: 'Samples / StateManagement / Zustand',
  component: ImmerAtom,
};

export const ImmerAtomDefault: StoryFC = (args) => <ImmerAtom {...args} />;

ImmerAtomDefault.parameters = {
  zeplinLink: '',
};
