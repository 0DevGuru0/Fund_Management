import React, { FC } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

import ServiceDialog from '$application/components/templates/ServiceDialog';

import { HeaderConfig } from '../Sidebar';

import DefaultHeader from './SidebarHeader/DefaultHeader';
import { ServiceConfig } from './SidebarHeader/Dialog';
import ProfileHeader from './SidebarHeader/ProfileHeader';

type Props = HeaderConfig & {
  isOpen: boolean;
  isDialogShown: boolean;
  currentService: string;
  services: ServiceConfig[];
  isShowWaffle?: boolean;
  onClose: () => void;
  onWaffleClick: () => void;
  className?: string;
};

export const SidebarHeader: FC<Props> = (props) => {
  return (
    <div className={clsx('sidebarHeader', props.className)}>
      {props.kind === 'Profile' ? (
        <ProfileHeader {...props} />
      ) : (
        <DefaultHeader {...props} />
      )}
      {props.isDialogShown && (
        <ExtendedServiceDialog
          isSidebarOpen={props.isOpen}
          services={props.services}
          currentService={props.currentService}
          onClose={props.onClose}
        />
      )}
    </div>
  );
};

const ExtendedServiceDialog = styled(({ isSidebarOpen, ...props }) => (
  <ServiceDialog {...props} />
))`
  top: 18px;
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? 12 : 24)}px;
  position: absolute;
`;

export default SidebarHeader;
