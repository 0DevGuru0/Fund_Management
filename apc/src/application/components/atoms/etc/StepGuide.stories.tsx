import React from 'react';

import styled from 'styled-components';

import CheckSVG from '$application/assets/icons/check.svg';
import EditSVG from '$application/assets/icons/edit.svg';
import ReportSVG from '$application/assets/icons/report.svg';
import UserSVG from '$application/assets/icons/users.svg';
import WorldSVG from '$application/assets/icons/world.svg';
import { StoryFC } from '$application/components/StoryFC';

import StepGuide, { StepConfig, StepGuideProps } from './StepGuide';

export default {
  title: 'Atoms / StepGuide ',
  component: StepGuide,
  parameters: { background: { noPadding: true } },
};

export const StepGuidComponent: StoryFC<StepGuideProps> = (args) => {
  return (
    <Container>
      <StepGuide {...args} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const stepsConfig: StepConfig[] = [
  { content: 'Apply For Fund ', icon: <EditSVG /> },
  { content: 'Voucher is reserved', icon: <CheckSVG /> },
  { content: 'Upload your acceptance letter', icon: <UserSVG /> },
  { content: 'Documents are checked& author iterations', icon: <WorldSVG /> },
  {
    content: 'Receive your voucher',
    icon: <ReportSVG />,
  },
];

StepGuidComponent.args = {
  steps: stepsConfig,
};

StepGuidComponent.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60c7171fcc8cd314eaef8e7c',
};
