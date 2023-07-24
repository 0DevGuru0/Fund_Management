import React, { FC } from 'react';

import styled, { css } from 'styled-components';

import { OptionItem, OptionItemProps } from './Options/OptionItem';

export interface OptionsProps {
  header?: string;
  className?: string;
  hasChevron?: boolean;
  actions: OptionItemProps[];
}

export const Options: FC<OptionsProps> = ({ header, actions, hasChevron, className }) => {
  return (
    <Container className={className} hasChevron={hasChevron}>
      {header && <HeaderText>{header}</HeaderText>}
      {actions.map((act, key) => (
        <OptionItem key={key} {...act} />
      ))}
    </Container>
  );
};

interface ContainerProps {
  hasChevron?: boolean;
}

const Container = styled.div<ContainerProps>`
  z-index: 2;
  position: inherit;
  border-radius: 8px;
  min-width: 140px;
  box-shadow: 0 6px 20px 0 rgba(193, 205, 221, 0.5);
  background-color: ${({ theme }) => theme.background.primary};
  ${({ hasChevron }) =>
    hasChevron &&
    css`
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid ${({ theme }) => theme.background.primary};
        clear: both;
      }
    `}
`;

const HeaderText = styled.div`
  color: ${({ theme }) => theme.text.contrast.primary};
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
  margin: 6px;
  padding: 6px;
  border-radius: 4px;
`;
