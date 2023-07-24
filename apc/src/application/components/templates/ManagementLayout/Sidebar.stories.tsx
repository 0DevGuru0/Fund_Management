import React, { useState } from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';
import { Role } from '$service/groups/Role';

import { Sidebar } from './Sidebar';
import sidebarsConfig from './Sidebar/sidebar.config';

export default {
  title: 'Templates / Management / Sidebar',
  component: Sidebar,
  parameters: { background: { noPadding: true } },
};

const userData = {
  fullName: 'Benicio del Toro',
  image: '/defaultUser.png',
  notifications: 120,
};

export const SidebarComponent: StoryFC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDialogShown, setDialogDisplay] = useState(false);

  const toggleSidebar = () => {
    setDialogDisplay(false);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeClickHandler = () => setDialogDisplay(false);

  const waffleClickHandler = () => setDialogDisplay(true);

  const sidebarConfig = sidebarsConfig.find(({ roles }) =>
    roles.includes(Role.SystemAdmin),
  )!;

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <Sidebar
        {...sidebarConfig}
        userData={userData}
        isOpen={isSidebarOpen}
        isDialogShown={isDialogShown}
        onToggle={toggleSidebar}
        onCloseClick={closeClickHandler}
        onWaffleClick={waffleClickHandler}
      />
    </SidebarContainer>
  );
};

interface ContainerProps {
  isSidebarOpen: boolean;
}

const SidebarContainer = styled.div<ContainerProps>`
  display: inline-block;
  vertical-align: top;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '96px')};
  height: 100vh;
  transition: width 300ms cubic-bezier(0.61, 1.01, 0.66, 1.15);
`;

SidebarComponent.parameters = {
  zeplinLink: [
    {
      name: 'Sidebars',
      link:
        'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1faaaf3361d2902bd96a3',
    },
  ],
  nextRouter: {
    pathname: '/dashboard',
  },
};
