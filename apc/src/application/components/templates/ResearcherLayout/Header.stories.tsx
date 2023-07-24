import React from 'react';

import MiniLogoSVG from '$application/assets/MiniLogo.svg';
import ResearcherLogoSVG from '$application/assets/service-logos/researcher.svg';
import FundManagerSVG from '$application/assets/service-logos/smartFund.svg';
import { StoryFC } from '$application/components/StoryFC';
import { Role } from '$service/groups/Role';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Templates / Researcher / Header',
  component: Header,
  parameters: { background: { noPadding: false } },
};

export const ResearcherHeader: StoryFC<HeaderProps> = (args) => {
  return <Header {...args} />;
};

type Config = {
  roles: Role[];
} & Omit<HeaderProps, 'notifyStatus' | 'search'>;

const headerConfig: Config[] = [
  {
    roles: [Role.Researcher],
    services: [
      { href: '/dashboard', label: 'System Admin', icon: <MiniLogoSVG /> },
      { href: '/researcher', label: 'Researcher', icon: <ResearcherLogoSVG /> },
      { href: '/fundManager', label: 'Fund Manager', icon: <FundManagerSVG /> },
    ],
    links: [
      { href: '/overview', label: 'Overview' },
      { href: '/journals', label: 'Journals' },
    ],
  },
];

const researcherConfig = headerConfig.find(({ roles }) =>
  roles.includes(Role.Researcher),
)!;

ResearcherHeader.args = {
  ...researcherConfig,
  notifyStatus: {
    status: 'new',
  },
  search: {
    onChange: () => {
      return '';
    },
  },
};

ResearcherHeader.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60a1fa8087bc552669e49ed2',
  nextRouter: {
    pathname: '/dashboard',
  },
};
