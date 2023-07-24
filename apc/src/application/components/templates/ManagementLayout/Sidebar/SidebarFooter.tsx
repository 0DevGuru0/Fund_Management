import React, { FC, useRef, useState } from 'react';

import styled from 'styled-components';

import SideCollapseSVG from '$application/assets/icons/side-collapse.svg';
import SidebarSVG from '$application/assets/icons/sidebar.svg';
import { Menu } from '$application/components/molecules/etc/Menu';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useClickOutside } from '$application/utils';

import { FooterConfig, UserSummary } from '../Sidebar';

type Props = FooterConfig & {
  isOpen?: boolean;
  onToggle: () => void;
  userData: UserSummary;
};

export const SidebarFooter: FC<Props> = ({ route, userData, isOpen, onToggle }) => {
  const userInfo = useUserInfo();
  const menuRef = useRef<HTMLInputElement>(null);
  const [showPopper, setShowPopper] = useState(false);
  useClickOutside(menuRef, () => setShowPopper(false));

  const onUserClick = () => {
    if (userInfo) {
      setShowPopper(true);
    } else {
      window.open('/api/v1/auth/login', '_self');
    }
  };

  const handleMenuSelect = (index): void => {
    if (index === 'Logout') {
      window.open('/api/v1/auth/logout', '_self');
    } else {
      window.open(route.href, '_self');
    }
  };

  return (
    <Container $isOpen={isOpen}>
      {isOpen && <CollapseButton onClick={onToggle} />}
      {!isOpen && <OpenSidebar onClick={onToggle} />}
      {showPopper && (
        <StyledMenu
          size="Small"
          $isOpen={isOpen}
          menuRef={menuRef}
          selectedItems={[]}
          onSelect={handleMenuSelect}
          items={['User Profile', 'Logout']}
        />
      )}
      <UserContainer $isOpen={isOpen} onClick={onUserClick}>
        <UserInfoContainer title={route.label}>
          <UserImage src={userData.image} $isOpen={isOpen} />
          {isOpen && (
            <RightContainer>
              <UserFullName>{userData.fullName}</UserFullName>
            </RightContainer>
          )}
        </UserInfoContainer>
      </UserContainer>
    </Container>
  );
};

const OpenSidebar = styled(SidebarSVG)`
  padding: 12px;
  padding-bottom: 24px;
  cursor: pointer;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
    &:hover {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primaryLight};
  }
`;

interface ContainerProps {
  $isOpen?: boolean;
}

const UserImage = styled.img<ContainerProps>`
  width: 36px;
  height: 36px;
  margin: 6px;
  border-radius: 8px;
  margin-right: ${({ $isOpen }) => ($isOpen ? '12px' : 'unset')};
`;

const UserFullName = styled.div`
  font-size: 16px;
  width: 168px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserContainer = styled.div<ContainerProps>`
  width: inherit;
  border-top: 1px solid #e3ebf7;
  align-self: flex-start;
  padding: 24px 0;
  overflow: hidden;
  transition: width 300ms ease;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const Container = styled.div<ContainerProps>`
  width: ${({ $isOpen }) => ($isOpen ? '252px' : '48px')};
  display: flex;
  flex-direction: column;
`;

const CollapseButton = styled(SideCollapseSVG)`
  align-self: flex-end;
  margin-bottom: 24px;
  cursor: pointer;
  height: 24px;
  float: right;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
    &:hover {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

const StyledMenu = styled(Menu)<ContainerProps>`
  left: ${({ $isOpen }) => ($isOpen ? '136px' : '67px')};
  bottom: 78px;
  z-index: 1500;
  position: absolute;
`;

export default SidebarFooter;
