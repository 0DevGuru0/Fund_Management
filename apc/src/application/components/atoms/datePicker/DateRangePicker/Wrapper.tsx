import React, { FC, ReactElement } from 'react';

import styled from 'styled-components';

interface WrapperProps {
  isFilled: boolean;
  isFocused: boolean;
  className?: string;
  children: ReactElement;
}

export const Wrapper: FC<WrapperProps> = ({
  children,
  isFilled,
  isFocused,
  className,
}) => {
  return (
    <Container $filled={isFilled} $focused={isFocused} className={className}>
      {children}
    </Container>
  );
};

export default Wrapper;

interface ContainerProps {
  $filled: boolean;
  $focused: boolean;
}

const Container = styled.div<ContainerProps>`
  min-width: 300px;
  * {
    font-family: Source Sans Pro !important;
    font-weight: normal;
  }
  .DateInput {
    background: transparent;
    width: ${({ $filled }) => ($filled ? '95px' : '45px')};
  }
  .DateRangePicker {
    width: 100%;
  }
  .DateRangePickerInput {
    width: 100%;
    padding-right: 12px;
    background-color: ${({ theme, $filled, $focused }) =>
      $filled || $focused ? theme.palette.grey[100] : theme.palette.grey[200]};
    box-shadow: 0 0 0 3px
      ${({ theme, $focused }) => ($focused ? theme.cmp.search.shadow : 'unset')};
    border: solid 1px
      ${({ theme, $filled, $focused }) =>
        $focused
          ? theme.palette.brand
          : $filled
          ? theme.palette.grey[800]
          : theme.palette.grey[200]};
  }
  .DateRangePickerInput_1 {
    width: 100%;
    border-radius: 8px;
    border: solid 1px
      ${({ theme, $filled }) =>
        $filled ? theme.palette.grey[800] : theme.palette.grey[200]};
  }
  .DateInput_input {
    padding: 13px 0 12px 0;
  }
  .DateInput_input__readOnly {
    background-color: transparent;
    color: ${({ theme, $filled }) =>
      $filled ? theme.text.contrast.secondary : theme.palette.grey[700]};
  }
  .DateRangePickerInput:hover {
    border: solid 1px ${({ theme }) => theme.palette.brand};
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }
  .DateRangePickerInput_arrow {
    margin: 3px 6px 0 6px;
    & > svg > g > g > path {
      fill: ${({ theme, $filled }) =>
        $filled ? theme.palette.grey[800] : theme.palette.grey[600]};
    }
  }
  .DateRangePickerInput_calendarIcon {
    margin: 0px;
    margin-top: 2px;
    padding: 0 6px 0 14px;
  }
  .DateInput_input__focused {
    border-bottom: 0px;
  }
  .DateInput_1 {
    & > svg {
      top: 54px !important;
    }
  }
  .DateRangePicker_picker__directionLeft_2 {
    top: 66px !important;
  }
`;
