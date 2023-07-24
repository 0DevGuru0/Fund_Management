import React, { createRef, FC } from 'react';

import clsx from 'classnames';
import Link from 'next/link';
import styled from 'styled-components';

import CloseSVG from '$application/assets/icons/close.svg';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useClickOutside } from '$application/utils/useClickOutSide';

import { ServiceConfig } from './ManagementLayout/Sidebar/SidebarHeader/Dialog';

interface Props {
  currentService: string;
  services: ServiceConfig[];
  onClose: () => void;
  className?: string;
}

export const ServiceDialog: FC<Props> = ({
  services,
  currentService,
  onClose,
  className,
}) => {
  const containerRef = createRef<HTMLDivElement>();
  const user = useUserInfo();
  const roles = Object.keys(user?.roles);

  const isCurrentService = (href: string) => href === currentService;

  useClickOutside(containerRef, onClose);

  return (
    <Container className={clsx('ServiceDialog', className)} ref={containerRef}>
      <CloseButton onClick={onClose} />
      <Header>Other Services</Header>
      <Description>Available Services</Description>
      {services
        .filter((config) =>
          config.roles
            ? config.roles.some((role) =>
                roles.some((userRole) => userRole.includes(role)),
              )
            : true,
        )
        .map((service: ServiceConfig, key: number) => (
          <Link href={service.href} key={key}>
            <ServiceButton isCurrent={isCurrentService(service.href)} onClick={onClose}>
              <Icon>{service.icon}</Icon>
              <Text>{service.label}</Text>
              {isCurrentService(service.href) && <Current>(Current)</Current>}
            </ServiceButton>
          </Link>
        ))}
    </Container>
  );
};

export default ServiceDialog;

interface ButtonProps {
  isCurrent: boolean;
}

const Container = styled.div`
  z-index: 2;
  width: 264px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 6px 20px 0 rgba(193, 205, 221, 0.5);
  background-color: ${({ theme }) => theme.background.primary};
`;

const CloseButton = styled(CloseSVG)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
    &:hover {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

const Header = styled.div`
  padding: 0 12px;
  margin-top: 12px;
  font-weight: bold;
  line-height: 18px;
  color: ${({ theme }) => theme.text.primary};
`;

const Description = styled.div`
  padding: 0 12px;
  margin-top: 6px;
  line-height: 18px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const ServiceButton = styled.div<ButtonProps>`
  width: 240px;
  height: 36px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 6px;
  display: flex;
  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

const Icon = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 6px;
`;

const Text = styled.div`
  margin: auto 0;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Current = styled.div`
  margin: auto 0;
  margin-left: 3px;
  line-height: 18px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;
