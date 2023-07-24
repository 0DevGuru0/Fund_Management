import React from 'react';

import MiniLogoSVG from '$application/assets/MiniLogo.svg';
import ResearcherLogoSVG from '$application/assets/service-logos/researcher.svg';
import FundManagerSVG from '$application/assets/service-logos/smartFund.svg';
import { SidebarProps } from '$application/components/templates/ManagementLayout/Sidebar';
import { HeaderProps } from '$application/components/templates/ResearcherLayout/Header';
import { Role } from '$service/groups/Role';

import { ServiceConfig } from '../ManagementLayout/Sidebar/SidebarHeader/Dialog';

export type SidebarConfig = {
  roles: Role[];
} & Omit<
  SidebarProps,
  'userData' | 'isOpen' | 'isDialogShown' | 'onToggle' | 'onWaffleClick' | 'onCloseClick'
>;

export interface ManagementLayout {
  sidebar: SidebarConfig[];
}

export type HeaderConfig = {
  roles: Role[];
} & Omit<HeaderProps, 'notifyStatus' | 'search'>;

interface ResearcherLayout {
  header: HeaderConfig[];
}

const services: ServiceConfig[] = [
  {
    href: '/',
    label: 'System Admin',
    icon: <MiniLogoSVG />,
    roles: [Role.SystemAdmin],
  },
  {
    href: '/researcher',
    label: 'Researcher',
    icon: <ResearcherLogoSVG />,
    roles: [Role.Researcher],
  },
  {
    href: '/fundManager/inbox',
    label: 'Fund Manager',
    icon: <FundManagerSVG />,
    roles: [Role.FundManager, Role.FundFinancialManager],
  },
];

export const researcherLayoutConfig: ResearcherLayout = {
  header: [
    {
      roles: [Role.Researcher],
      services,
      links: [
        { href: '/researcher/overview', label: 'Overview' },
        { href: '/researcher/journalFinder', label: 'Journal Finder' },
      ],
    },
  ],
};
