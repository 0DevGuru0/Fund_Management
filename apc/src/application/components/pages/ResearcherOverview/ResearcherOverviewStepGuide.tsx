import React, { FC } from 'react';

import styled from 'styled-components';

import CheckSVG from '$application/assets/icons/check.svg';
import EditSVG from '$application/assets/icons/edit.svg';
import ReportSVG from '$application/assets/icons/report.svg';
import UserSVG from '$application/assets/icons/users.svg';
import WorldSVG from '$application/assets/icons/world.svg';
import StepGuide, { StepConfig } from '$application/components/atoms/etc/StepGuide';

const stepsConfig: StepConfig[] = [
  { content: 'Apply For Fund ', icon: <EditSVG /> },
  { content: 'Voucher is reserved', icon: <CheckSVG /> },
  { content: 'Upload your acceptance letter', icon: <UserSVG /> },
  { content: 'Documents are checked', icon: <WorldSVG /> },
  {
    content: 'Receive your voucher',
    icon: <ReportSVG />,
  },
];

export const ResearcherOverviewStepGuide: FC = () => (
  <StepContainer>
    <StepGuide steps={stepsConfig} />
  </StepContainer>
);

const StepContainer = styled.div`
  width: 80%;
  max-width: 1155px;
  margin: 72px auto 48px auto;
`;

export default ResearcherOverviewStepGuide;
