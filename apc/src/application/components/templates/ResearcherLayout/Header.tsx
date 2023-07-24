import React, { FC, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import WaffleSVG from '$application/assets/icons/waffle.svg';
import LogoSVG from '$application/assets/Logo.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import { HeadTabItem } from '$application/components/atoms/etc/Tab';
import { SearchProps } from '$application/components/molecules/inputs/Search';
import ServiceDialog from '$application/components/templates/ServiceDialog';
import { useUserInfo } from '$application/lib/auth/useUserInfo';

import { ServiceConfig } from '../ManagementLayout/Sidebar/SidebarHeader/Dialog';

import { NotificationProps } from './Header/Notification';
import { Researcher } from './Header/Researcher';

export interface HeaderProps {
  notifyStatus: NotificationProps;
  search?: SearchProps;
  services: ServiceConfig[];
  links: HeadTabItem[];
}

export const Header: FC<HeaderProps> = ({ notifyStatus, search, links, services }) => {
  const router = useRouter();
  const [serviceDialogShown, setServiceDialogShown] = useState(false);
  const userInfo = useUserInfo();
  const userRoles = Object.keys(userInfo.roles);
  const viableServices = services.filter((config) =>
    config.roles
      ? config.roles.some((role) => userRoles.some((userRole) => userRole.includes(role)))
      : true,
  );

  const waffleClickHandler = () => {
    setServiceDialogShown(true);
  };

  const dialogCloseHandler = () => setServiceDialogShown(false);

  return (
    <MainContainer>
      <Div>
        <CenteringWrapper>
          <ServiceWrapper>
            {viableServices.length > 1 ? (
              <WaffleIcon onClick={waffleClickHandler} />
            ) : undefined}
            {serviceDialogShown && (
              <ExtendedServiceDialog
                services={services}
                currentService={router.pathname}
                onClose={dialogCloseHandler}
              />
            )}
          </ServiceWrapper>
          <Link href="/">
            <Logo />
          </Link>
        </CenteringWrapper>
        {/* <Tab tabs={links} variant="Head" size="Small" activeTab={router.pathname} /> */}
        <CenteringWrapper style={{ justifyContent: 'flex-end', flex: 1 }}>
          {/* <HeaderSearch onSearch={search.onSearch} /> */}
          {/* <Notification {...notifyStatus} /> */}
          {/* <Separator /> */}
          {userInfo ? (
            <Researcher
              name={userInfo ? `${userInfo?.given_name} ${userInfo?.family_name}` : ''}
              userName={userInfo?.preferred_username ?? ''}
              image={userInfo.picture ?? '/defaultUser.png'}
            />
          ) : (
            <Link href="/api/v1/auth/login">
              <Button title="LogIn" color="default" />
            </Link>
          )}
        </CenteringWrapper>
      </Div>
    </MainContainer>
  );
};
const ExtendedServiceDialog = styled(ServiceDialog)`
  top: -10px;
  left: -10px;
  position: absolute;
`;

const ServiceWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 36px;
`;

// const Separator = styled.div`
//   height: 24px;
//   margin: 12px 18px 12px 24px;
//   border: 1px solid ${({ theme }) => theme.palette.primaryLight};
// `;

const CenteringWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 36px;
  padding-right: 36px;
  width: 1548px;
  margin: 0 auto;
  height: 84px;
  background-color: ${({ theme }) => theme.background.primary};
`;
const MainContainer = styled.div`
  z-index: 999;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  box-shadow: 0 2px 6px 0 ${({ theme }) => theme.palette.primaryLight};
`;

// const HeaderSearch = styled(Search)`
//   margin-right: 30px;
//   width: 269px;
// `;

const WaffleIcon = styled(({ theme, ...props }) => <WaffleSVG {...props} />)`
  width: 24px;
  cursor: pointer;
  path,
  use {
    fill: ${({ theme }) => theme.text.primary};
    &:hover {
      fill: ${({ theme }) => theme.palette.secondary};
    }
  }
`;

const Logo = styled(LogoSVG)`
  width: 141px;
  height: 43px;
  margin: 24px 30px 17px 0;
  cursor: pointer;
`;
