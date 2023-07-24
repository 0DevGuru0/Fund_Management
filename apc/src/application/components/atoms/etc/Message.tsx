import React, { FC, ReactElement } from 'react';

import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { getThemes } from '$application/theme/getThemes';

const theme = getThemes().LightBase;

export enum ServiceStatus {
  Error = 'Error',
  Success = 'Success',
  Loading = 'Loading',
  Idle = 'Idle',
}

export type MessageProps = {
  status: ServiceStatus;
} & RequireOnlyOne<{
  message: string;
  children: ReactElement;
}>;

export const Message: FC<MessageProps> = ({ status, message, children }) => {
  return <Wrapper status={status}>{message ?? children}</Wrapper>;
};

interface WrapperProps {
  status: ServiceStatus;
}

const Wrapper = styled.div<WrapperProps>`
  padding: 10px;
  width: inherit;
  text-align: center;
  border-radius: 10px;
  ${({ status }) => {
    let mainColor: string;

    switch (status) {
      case ServiceStatus.Error:
        mainColor = theme.taskPalette.red;
        break;
      case ServiceStatus.Loading:
        mainColor = theme.taskPalette.yellow;
        break;
      case ServiceStatus.Success:
        mainColor = theme.taskPalette.green;
        break;
      default:
        mainColor = theme.taskPalette.orange;
    }

    return css`
      color: ${mainColor};
      border: 1px ${mainColor} solid;
      background-color: ${rgba(mainColor, 0.08)};
    `;
  }}
`;
