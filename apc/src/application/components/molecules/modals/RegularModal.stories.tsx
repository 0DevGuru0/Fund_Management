import React from 'react';

import { css } from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { RegularModal, RegularModalProps } from './RegularModal';

export default {
  title: 'Molecules / Modals ',
  component: RegularModal,
  parameters: { background: { noPadding: true } },
};

export const Simple: StoryFC<RegularModalProps> = (args) => {
  return (
    <>
      <span>some text for test</span>
      <RegularModal {...args} />
    </>
  );
};

Simple.args = {
  subTitle:
    'You must first specify the journal you want and then enter the details of your article',
  mainTitle: 'Submit Application',
  open: true,
  paperStyle: css`
    padding: 36px;
  `,
};

Simple.parameters = {
  zeplinLink: '',
};
