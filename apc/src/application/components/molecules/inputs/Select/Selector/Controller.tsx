import React, { FC } from 'react';

import styled, { keyframes } from 'styled-components';

import ArrowSVG from '$application/assets/icons/chevron-down.svg';
import { LoadingData } from '$application/components/atoms/etc/LoadingData';

interface ControllerProps {
  focused: boolean;
  loading?: boolean;
  hasLabel: boolean;
  disabled?: boolean;
}

export const Controller: FC<ControllerProps> = ({
  focused,
  hasLabel,
  disabled,
  loading = false,
}) => {
  return (
    <LoadingData loading={loading} customLoaderWrapper={() => <Loader />}>
      {() => <ArrowIcon $focused={focused} $disabled={disabled} $hasLabel={hasLabel} />}
    </LoadingData>
  );
};

export default Controller;

const Transition = keyframes`
 from {
   transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 18px;
  height: 18px;
  margin: 0 auto;
  border-radius: 50%;
  animation-duration: 2s;
  animation-name: ${Transition};
  animation-iteration-count: infinite;
  border: 3px solid ${({ theme }) => theme.palette.secondary};
  border-top: 3px solid ${({ theme }) => theme.palette.grey[300]};
`;

interface IconProps {
  $focused: boolean;
  $disabled?: boolean;
  $hasLabel?: boolean;
}

const ArrowIcon = styled(ArrowSVG)<IconProps>`
  right: 12px;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  position: absolute;
  transition-duration: 300ms;
  top: ${({ $hasLabel }) => ($hasLabel ? 50 : 18)}px;
  transform: rotate(${({ $focused }) => ($focused ? 180 : 0)}deg);
  path,
  use {
    fill: ${({ theme, $disabled }) =>
      $disabled ? theme.text.lowContrast : theme.text.contrast.primary};
  }
`;
