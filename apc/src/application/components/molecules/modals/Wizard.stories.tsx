import React from 'react';

import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import MeetingSVG from '$application/assets/icons/meeting-fill.svg';
import { StoryFC } from '$application/components/StoryFC';

import { Wizard } from './Wizard';
import { WizardProps } from './Wizard/types';

export default {
  title: 'Molecules / Modals / Wizard ',
  component: Wizard,
  parameters: { background: { noPadding: true } },
};

export const Sample: StoryFC<WizardProps> = (args) => {
  return (
    <>
      <span>some text for test</span>
      <Wizard {...args} />
    </>
  );
};

const Icon = styled(MeetingSVG)`
  width: 48px;
  height: 48px;
  path,
  use {
    fill: ${({ theme }) => theme.palette.grey['600']};
  }
`;

Sample.args = {
  open: true,
  title: 'Create Group',
  description:
    'Enter the name for the group you want, and then restrict it to a publisher if you wish.',
  icon: <Icon />,
  currentStep: 1,
  steps: [
    {
      title: '1. Select journal',
      children: <div>Test</div>,
      buttons: [
        {
          label: 'Back to Group Detail',
          icon: <ArrowSVG />,
        },
      ],
    },
    {
      title: '1. Select journal',
      children: <div>Test</div>,
      buttons: [
        {
          label: 'Back to Group Detail',
          icon: <ArrowSVG />,
        },
      ],
    },
    {
      title: '1. Select journal',
      children: <div>Test</div>,
      buttons: [
        {
          label: 'Back to Group Detail',
          icon: <ArrowSVG />,
        },
      ],
    },
  ],
};

Sample.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a4d5753f9c14959e5ced',
};
