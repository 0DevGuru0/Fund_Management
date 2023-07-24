import React, { FC, ReactNode } from 'react';

import Link from 'next/link';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

interface SidebarButtonProps {
  icon: ReactNode;
  iconFilled?: ReactNode;
  label: string;
  href: string;
  withLabel?: boolean;
  isPrimary?: boolean;
  isActive?: boolean;
  notifications?: number;
}

export const Button: FC<SidebarButtonProps> = (props) => {
  const { isActive, isPrimary, icon, iconFilled, label, href, withLabel } = props;

  return (
    <Container>
      <Link href={href}>
        <ButtonContainer title={label} isActive={isActive} isPrimary={isPrimary}>
          <Icon>{!isActive ? icon : iconFilled || icon}</Icon>
          {withLabel && <Text isActive={isActive}>{label}</Text>}
          {/* {notifications && label === 'Notification' && (
            <Notification numberOfNotifications={notifications}>
              {notifications > 100 ? '+99' : notifications}
            </Notification>
          )} */}
        </ButtonContainer>
      </Link>
      {isActive && <SelectedIndicator />}
    </Container>
  );
};

interface ButtonProps {
  isPrimary?: boolean;
  isActive?: boolean;
  numberOfNotifications?: number;
}

const Icon = styled.div`
  height: 24px;
  > svg {
    width: inherit;
    height: inherit;
    & path,
    & use {
      fill: ${({ theme }) => theme.text.contrast.primary};
    }
  }
`;

const Text = styled.div<ButtonProps>`
  line-height: 1.5;
  margin-left: 12px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`;

const highlighted = ({ theme }) => css`
  color: ${theme.palette.primary};
  ${Icon} > svg path, use {
    fill: ${theme.palette.primary} !important;
  }
`;

const Container = styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
`;

const ButtonContainer = styled.div<ButtonProps>`
  padding: 12px;
  font-size: 16px;
  border-radius: 12px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: left;
  height: 24px;
  line-height: 1.5;
  cursor: pointer;
  ${({ isActive }) => isActive && highlighted};
  margin-right: ${({ isActive }) => (isActive ? 18 : 24)}px;
  &:hover {
    ${highlighted};
    background-color: ${({ theme }) => rgba(theme.palette.primaryLight, 0.6)};
  }
`;

const SelectedIndicator = styled.div`
  margin: auto 0;
  width: 6px;
  height: 36px;
  border-radius: 12px 0 0 12px;
  background-color: ${({ theme }) => theme.palette.primary};
`;

export default Button;
