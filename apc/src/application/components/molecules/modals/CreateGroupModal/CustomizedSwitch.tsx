import React, { FC } from 'react';

import { Switch } from '@material-ui/core';
import styled from 'styled-components';

interface CustomizedSwitchProps {
  isChecked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export const CustomizedSwitch: FC<CustomizedSwitchProps> = ({
  onToggle,
  isChecked,
  disabled = false,
}) => {
  return (
    <StyledSwitch
      disableRipple
      disabled={disabled}
      checked={isChecked}
      onChange={onToggle}
    />
  );
};

export default CustomizedSwitch;

const StyledSwitch = styled(Switch)`
  margin: 0;
  width: 33px;
  height: 27px;
  padding: 4px 0;
  .MuiIconButton-root:hover {
    background-color: rgba(0, 0, 0, 0);
  }
  .MuiSwitch-switchBase.Mui-checked {
    transform: translateX(13px);
  }
  .MuiSwitch-switchBase {
    padding: 6px 2px;
  }
  .MuiSwitch-thumb {
    width: 15px;
    height: 15px;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.palette.grey[400]};
  }
  .MuiSwitch-track {
    opacity: 1;
    border-radius: 13px;
    border: 1px solid ${({ theme }) => theme.palette.grey[400]};
    background-color: ${({ theme }) => theme.palette.grey[400]};
  }
  .MuiSwitch-colorSecondary {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
  .MuiSwitch-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.background.primary};
  }
  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    opacity: 1;
  }
  .MuiSwitch-colorSecondary.Mui-disabled + .MuiSwitch-track {
    opacity: 0.4;
    background-color: ${({ theme }) => theme.palette.secondary};
  }
`;
