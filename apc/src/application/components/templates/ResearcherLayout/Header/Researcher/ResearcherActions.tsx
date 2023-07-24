import React, { FC } from 'react';

import { rgba } from 'polished';
import styled from 'styled-components';

import LogoutSVG from '$application/assets/icons/logout.svg';

export interface OptionItem {
  icon: any;
  label: string;
  currentValue?: string;
  onClick: () => void;
}

export interface ResearcherActionsProps {
  username: string;
  role: string;
  actions: OptionItem[];
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const ResearcherActions: FC<ResearcherActionsProps> = (props) => {
  const { isOpen, username, role, actions, onLogout, onClose } = props;

  const handleItemClick = (cb: () => void) => () => {
    onClose();
    cb();
  };

  return (
    <Container isOpen={isOpen}>
      <Header>
        <Role>{role}</Role>
        <Identifier>{username}</Identifier>
      </Header>
      {actions.map((act, key) => (
        <ActionRow key={key} onClick={handleItemClick(act.onClick)}>
          {act.icon}
          <ActionLabel>{act.label}</ActionLabel>
          {act.currentValue && <ActionValue>{act.currentValue}</ActionValue>}
        </ActionRow>
      ))}
      <Separator />
      <LogoutRow onClick={handleItemClick(onLogout)}>
        <LogoutSVG />
        <ActionLabel>Logout</ActionLabel>
      </LogoutRow>
    </Container>
  );
};

interface ContainerProps {
  isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  right: 0;
  top: 54px;
  float: right;
  z-index: 4;
  min-width: 226px;
  border-radius: 8px;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: 0 6px 20px 0 rgba(193, 205, 221, 0.5);
  background-color: ${({ theme }) => theme.background.primary};
`;

const Header = styled.div`
  border-radius: 8px 8px 0 0;
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.primaryLight};
  cursor: default;
`;
const Role = styled.span`
  display: block;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
const Identifier = styled.span`
  display: block;
  font-size: 14px;
  line-height: 18px;
  margin-top: 3px;
`;

const ActionRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  & :hover {
    background-color: ${({ theme }) => rgba(theme.cmp.button.secondary, 0.4)};
  }
  & > svg {
    width: 20px;
    height: 20px;
    path,
    use {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

const ActionLabel = styled.div`
  padding: 0 6px;
  font-size: 16px;
  flex-grow: 1;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const ActionValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-right: 6px;
  color: ${({ theme }) => theme.text.lowContrast};
`;

const Separator = styled.div`
  height: 1px;
  margin: 0 12px 0 12px;
  background-color: ${({ theme }) => theme.palette.primaryLight};
`;

const LogoutRow = styled(ActionRow)`
  ${ActionLabel} {
    color: ${({ theme }) => theme.cmp.header.negative};
  }
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.cmp.header.logout};
  }
  > svg {
    width: 20px;
    height: 20px;
    transform: rotate(180deg);
  }
  > svg path,
  > svg use {
    fill: ${({ theme }) => theme.cmp.header.negative};
  }
`;
