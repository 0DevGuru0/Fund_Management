import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';

import ChevronSVG from '$application/assets/icons/chevron-right.svg';

export interface StepConfig {
  content: string;
  icon: ReactNode;
}
export interface StepGuideProps {
  steps: StepConfig[];
}

export const StepGuide: FC<StepGuideProps> = ({ steps }) => {
  return (
    <Container>
      {steps.map(({ icon, content }, idx) => (
        <StepWrapper key={idx}>
          <StepIcon>{icon}</StepIcon>
          <StepContext>
            <StepNum>{idx + 1}</StepNum>
            <StepContent>{content}</StepContent>
          </StepContext>
          {steps.length !== idx + 1 && <ArrowIcon />}
        </StepWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const StepWrapper = styled.div`
  display: flex;
`;
const StepContext = styled.div`
  width: 115px;
  margin-left: 12px;
`;

const StepNum = styled.div`
  width: 13px;
  height: 32px;
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.33;
  color: ${({ theme }) => theme.text.lowContrast};
`;
const StepIcon = styled.div`
  & > svg {
    width: 24px;
    height: 24px;
    path,
    use {
      fill: ${({ theme }) => theme.text.lowContrast};
    }
  }
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: solid 2px ${({ theme }) => theme.text.lowContrast};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StepContent = styled.div`
  width: 115px;
  height: 40px;
  font-size: 14px;
  line-height: 1.43;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const ArrowIcon = styled(ChevronSVG)`
  width: 24px;
  height: 24px;
  margin: 7px 24px 0;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
  }
`;

export default StepGuide;
