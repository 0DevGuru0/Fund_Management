import { FC } from 'react';

import styled from 'styled-components';

export interface StepperIconProps {
  active?: boolean;
  completed?: boolean;
}

export const StepperIcon: FC<StepperIconProps> = ({ active, completed }) => {
  if (active) {
    return <ActiveIcon />;
  }
  if (completed) {
    return <CompleteIcon />;
  }
  return <Icon />;
};

const Icon = styled.div`
  margin: 4px 0;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey[500]};
`;

const CompleteIcon = styled(Icon)`
  background-color: ${({ theme }) => theme.palette.secondary};
`;

const ActiveIcon = styled(CompleteIcon)`
  box-shadow: 0 0 0 4px ${({ theme }) => theme.background.secondary},
    0 0 0 5px ${({ theme }) => theme.palette.secondary};
`;
