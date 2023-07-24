/* eslint-disable no-console */
import React, { createRef, FC, useState } from 'react';

import Router from 'next/router';
import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/chevron-down.svg';
// import GlobeSVG from '$application/assets/icons/globe.svg';
// import SettingsSVG from '$application/assets/icons/settings.svg';
import UserSVG from '$application/assets/icons/user.svg';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { getUserRole } from '$application/utils/userRole';

import { OptionItem, ResearcherActions } from './Researcher/ResearcherActions';

import { useClickOutside } from '$utils';

export interface ResearcherProps {
  image: any;
  name: string;
  userName: string;
}

const researcherActions: OptionItem[] = [
  {
    icon: <UserSVG />,
    label: 'Profile',
    currentValue: '',
    onClick: () => Router.push('/researcher/profile'),
  },
  // {
  //   icon: <SettingsSVG />,
  //   label: 'Setting',
  //   currentValue: '',
  //   onClick: () => console.log('on settings clicked'),
  // },
  // {
  //   icon: <GlobeSVG />,
  //   label: 'Language',
  //   currentValue: 'English',
  //   onClick: () => console.log('on language clicked'),
  // },
];

const publisherActions: OptionItem[] = [
  {
    icon: <UserSVG />,
    label: 'Profile',
    currentValue: '',
    onClick: () => Router.push('/publisherAdmin/profile'),
  },
];

const fundFinancialActions: OptionItem[] = [
  {
    icon: <UserSVG />,
    label: 'Profile',
    currentValue: '',
    onClick: () => Router.push('/fundFinancialManager/profile'),
  },
];

const funderActions: OptionItem[] = [
  {
    icon: <UserSVG />,
    label: 'Profile',
    currentValue: '',
    onClick: () => Router.push('/fundManager/profile'),
  },
];

const adminActions: OptionItem[] = [
  {
    icon: <UserSVG />,
    label: 'Profile',
    currentValue: '',
    onClick: () => Router.push('/management/profile'),
  },
];

export const Researcher: FC<ResearcherProps> = ({ image, name, userName }) => {
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const containerRef = createRef<HTMLDivElement>();
  const userInfo = useUserInfo();

  const logoutHandler = () => {
    if (userInfo) {
      window.open('/api/v1/auth/logout', '_self');
    }
  };

  const toggleState = () => {
    setActionStatus(!actionStatus);
  };
  const closeHandler = () => {
    setActionStatus(false);
  };

  useClickOutside(containerRef, closeHandler);
  let actions = researcherActions;
  const { role } = getUserRole();

  switch (role) {
    case 'FundFinancialManager':
      actions = fundFinancialActions;
      break;
    case 'FundManager':
      actions = funderActions;
      break;
    case 'PublisherAdmin':
      actions = publisherActions;
      break;
    case 'SystemAdmin':
      actions = adminActions;
      break;
  }

  return (
    <MainContainer ref={containerRef}>
      <ResearcherContainer onClick={toggleState}>
        <Image src={image} />
        <Name>{name}</Name>
        <ChevronSVG $rotated={actionStatus} />
      </ResearcherContainer>
      <ResearcherActions
        actions={actions}
        role={role}
        username={userName}
        isOpen={actionStatus}
        onClose={closeHandler}
        onLogout={logoutHandler}
      />
    </MainContainer>
  );
};

interface ChevronSVGProps {
  $rotated: boolean;
}

const ChevronSVG = styled(ArrowSVG)<ChevronSVGProps>`
  width: 18px;
  height: 18px;
  transition-duration: 300ms;
  transform: rotate(${({ $rotated }) => ($rotated ? 180 : 0)}deg);
  path,
  use {
    fill: ${({ theme }) => theme.text.primary};
    font-size: 22px;
  }
`;

const ResearcherContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 6px;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.background.secondary};
    ${ChevronSVG} path {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;

const MainContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.primary};
`;

const Name = styled.span`
  display: inline-block;
  width: max-content;
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-size: 16px;
  font-weight: 400;
  padding: 0 6px 0 12px;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 8px;
`;
