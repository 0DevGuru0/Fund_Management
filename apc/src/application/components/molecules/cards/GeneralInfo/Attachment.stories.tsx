import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Attachment, AttachmentProps } from './Attachment';

export default {
  title: 'Molecules / Cards / Attachment',
  component: Attachment,
};

export const Default: StoryFC<AttachmentProps> = (args) => {
  return (
    <Container>
      <Attachment {...args} />
    </Container>
  );
};

Default.args = {
  file: {
    name: 'sdf43434a53s5px10x84e273uwe3.pdf',
    path: 'download/path/sdf43434a53s5px10x84e273uwe3.pdf',
    volume: '324 KB',
    createdDate: '5 seconds ago',
    type: 'application/pdf',
  },
};

Default.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfff6e40b0112c7fc94a',
};

const Container = styled.div`
  width: 333px;
`;
