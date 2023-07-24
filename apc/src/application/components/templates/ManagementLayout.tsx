import React, { FC } from 'react';

import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import { Footer } from '$application/components/atoms/etc/Footer';
import footerConfig from '$application/components/atoms/etc/Footer/footer.config';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { PageProps } from '$pages/_layout';

import ErrorPage from '../molecules/etc/ErrorPage';

import ManagementHeader from './ManagementLayout/ManagementHeader';
import { Sidebar } from './ManagementLayout/Sidebar';
import sidebarsConfig from './ManagementLayout/Sidebar/sidebar.config';
import { isDialogShownAtom, isSidebarOpenAtom } from './ManagementLayout/store';

import { hideScrollBar } from '$utils';

export interface UserData {
  image: string;
  fullName: string;
  notifications?: number;
}

export const ManagementLayout: FC<PageProps> = ({
  children,
  breadcrumbs,
  authorizeRole,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [isDialogShown, setDialogDisplay] = useAtom(isDialogShownAtom);
  const userInfo = useUserInfo();
  const user = {
    image: userInfo?.picture ?? '/defaultUser.png',
    fullName: userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : '',
    notifications: 0,
  };

  const toggleSidebar = () => {
    setDialogDisplay(false);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeClickHandler = () => setDialogDisplay(false);

  const waffleClickHandler = () => setDialogDisplay(true);

  const sidebarConfig = sidebarsConfig.find(({ roles }) =>
    roles.some((role) => Object.keys(userInfo?.roles).includes(role)),
  )!;

  const hasAccess = authorizeRole
    ? Object.keys(userInfo?.roles).includes(authorizeRole)
    : true;

  if (isEmpty(userInfo?.roles) || !hasAccess) {
    return (
      <Wrapper>
        <ErrorPage errorCode="403" description="You don't have access to this page" />;
      </Wrapper>
    );
  }

  return (
    <Container>
      <SidebarContainer isSidebarOpen={isSidebarOpen}>
        <Sidebar
          {...sidebarConfig}
          userData={user}
          isOpen={isSidebarOpen}
          isDialogShown={isDialogShown}
          onToggle={toggleSidebar}
          onCloseClick={closeClickHandler}
          onWaffleClick={waffleClickHandler}
        />
      </SidebarContainer>
      <BodyContainer isSidebarOpen={isSidebarOpen}>
        {breadcrumbs && <ManagementHeader breadcrumbs={breadcrumbs} />}
        <ContentWrapper>
          <Body>
            {children}
            <Footer narrowPadding={isSidebarOpen} footerConfig={footerConfig} />
          </Body>
        </ContentWrapper>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

interface ContainerProps {
  isSidebarOpen: boolean;
}

const BodyContainer = styled.div<ContainerProps>`
  position: relative;
  display: inline-block;
  width: calc(100vw - ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '96px')});
`;

const layoutBottomMargin = 89;
const ContentWrapper = styled.div`
  ${hideScrollBar};
  vertical-align: top;
  height: calc(100vh - ${layoutBottomMargin}px);
  overflow-y: scroll;
  transition: width 300ms cubic-bezier(0.61, 1.01, 0.66, 1.15);
`;

const SidebarContainer = styled.div<ContainerProps>`
  display: inline-block;
  vertical-align: top;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '96px')};
  height: 100vh;
  transition: width 300ms cubic-bezier(0.61, 1.01, 0.66, 1.15);
`;

const Body = styled.div`
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  height: inherit;
  & > div:nth-last-child(2) {
    flex: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default ManagementLayout;
