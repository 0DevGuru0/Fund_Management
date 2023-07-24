import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Modal, ModalProps } from './Modal';

export default {
  title: 'Atoms / Modal ',
  component: Modal,
  parameters: { background: { noPadding: true } },
};

export const Simple: StoryFC<ModalProps> = (args) => {
  return (
    <>
      <span>some text for test</span>
      <Modal {...args}>
        <Content />
      </Modal>
    </>
  );
};

const Content = styled.div`
  width: 200px;
  height: 200px;
  background-color: grey;
`;

Simple.args = {
  open: true,
};

Simple.parameters = {
  zeplinLink: '',
};
