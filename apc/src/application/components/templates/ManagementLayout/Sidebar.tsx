import React, { ReactNode } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { hideScrollBar } from '$application/utils/css/hideScrollBar';

import { UserData } from '../ManagementLayout';

import SidebarBody from './Sidebar/SidebarBody';
import SidebarFooter from './Sidebar/SidebarFooter';
import SidebarHeader from './Sidebar/SidebarHeader';
import { ServiceConfig } from './Sidebar/SidebarHeader/Dialog';

export interface ButtonConfig {
  group?: string;
  icon: ReactNode;
  iconFilled?: ReactNode;
  label: string;
  href: string;
}

export type HeaderConfig =
  | {
      kind: 'Profile';
      picture: ReactNode;
      title: string;
      subTitle: string;
    }
  | {
      kind: 'Default';
    };

export type UserSummary = Omit<UserData, 'notifications'>;

export interface FooterConfig {
  route: Omit<ServiceConfig, 'icon'>;
}

interface Sections {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  [sectionName: string]: ServiceConfig[];
}

export interface SidebarProps {
  userData: UserData;
  sections: Sections;
  services: ServiceConfig[];
  header: HeaderConfig;
  footer: FooterConfig;
  disableCollapse?: boolean;
  isOpen: boolean;
  isDialogShown: boolean;
  onToggle: () => void;
  onCloseClick: () => void;
  onWaffleClick: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const {
    userData,
    sections,
    services,
    header,
    footer,
    isOpen,
    isDialogShown,
    onToggle,
    onCloseClick,
    onWaffleClick,
  } = props;
  const router = useRouter();
  const user: UserSummary = {
    fullName: userData.fullName,
    image: userData.image,
  };

  const userInfo = useUserInfo();
  const userRoles = Object.keys(userInfo.roles);
  const viableServices = services.filter((config) =>
    config.roles
      ? config.roles.some((role) => userRoles.some((userRole) => userRole.includes(role)))
      : true,
  );

  return (
    <Container>
      <ExtendedSidebarHeader
        {...header}
        isOpen={isOpen}
        services={services}
        isDialogShown={isDialogShown}
        currentService={router.pathname}
        onClose={onCloseClick}
        onWaffleClick={onWaffleClick}
        isShowWaffle={viableServices.length > 1}
      />
      <ExtendedSidebarBody
        sections={sections}
        isOpen={isOpen}
        currentPage={router.pathname}
        notifications={userData.notifications}
      />
      <SidebarFooter {...footer} userData={user} isOpen={isOpen} onToggle={onToggle} />
    </Container>
  );
};

const sidebarPadding = 24;

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${sidebarPadding}px);
  padding: ${sidebarPadding}px 0 0 ${sidebarPadding}px;
`;

const ExtendedSidebarBody = styled(SidebarBody)`
  && {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    ${hideScrollBar}
  }
`;

const ExtendedSidebarHeader = styled(SidebarHeader)`
  && {
    padding-bottom: 36px;
  }
`;
