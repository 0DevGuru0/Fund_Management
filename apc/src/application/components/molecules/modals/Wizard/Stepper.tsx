import { FC } from 'react';

import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepConnector as MuiStepConnector,
  StepLabel as MuiStepLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { times } from 'lodash';
import styled from 'styled-components';

import { StepperIcon } from './StepperIcon';

export interface StepperProps {
  count: number;
  currentStep: number;
}

export const Stepper: FC<StepperProps> = ({ currentStep, count }) => {
  return (
    <Container activeStep={currentStep} alternativeLabel connector={<StepConnector />}>
      {times(count).map((s) => (
        <MuiStep key={`s-${s}`}>
          <MuiStepLabel StepIconComponent={StepperIcon} />
        </MuiStep>
      ))}
    </Container>
  );
};

const Container = styled(MuiStepper)`
  && {
    background-color: transparent;
    width: 267px;
    align-self: center;
  }
`;

const StepConnector = withStyles((theme) => ({
  active: {
    '& $line': {
      borderColor: theme.palette.secondary.main,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.secondary.main,
    },
  },
  line: {
    borderColor: theme.palette.grey[500],
    borderTopWidth: 1,
    borderTopStyle: 'dashed',
    borderRadius: 1,
  },
}))(MuiStepConnector);
