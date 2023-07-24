/**
 * You can change the side of each role from here
 */
import React from 'react';

import { Icon } from '@iin/pubnito-components';

// import FunderFilledSVG from '$application/assets/icons/credit-card-fill.svg';
// import FunderSVG from '$application/assets/icons/credit-card.svg';
// import DashboardSVG from '$application/assets/icons/dashboard.svg';
import ReportFillSVG from '$application/assets/icons/file-text-fill.svg';
import ReportSVG from '$application/assets/icons/file-text.svg';
import InboxFilledSVG from '$application/assets/icons/inbox-fill.svg';
import InboxSVG from '$application/assets/icons/inbox.svg';
// Report Section
// import InstituteFilledSVG from '$application/assets/icons/institute-fill.svg';
// import InstituteSVG from '$application/assets/icons/institute.svg';
import JournalFilledSVG from '$application/assets/icons/journal-fill.svg';
import JournalSVG from '$application/assets/icons/journal.svg';
import MessageFilledSVG from '$application/assets/icons/message-square-fill.svg';
import MessageSVG from '$application/assets/icons/message-square.svg';
// import PublisherFilledSVG from '$application/assets/icons/publisher-fill.svg';
// import PublisherSVG from '$application/assets/icons/publisher.svg';
// import ReportFilledSVG from '$application/assets/icons/report-fill.svg';
// import ReportSVG from '$application/assets/icons/report.svg';
import ShieldFilledSVG from '$application/assets/icons/shield-fill.svg';
import ShieldSVG from '$application/assets/icons/shield.svg';
// import UsersFilledSVG from '$application/assets/icons/users-fill.svg';
// import UsersSVG from '$application/assets/icons/users.svg';
// import VoucherSVG from '$application/assets/icons/voucher.svg';
import FundManagerSVG from '$application/assets/service-logos/fundManager.svg';
import ResearcherLogoSVG from '$application/assets/service-logos/researcher.svg';
import MiniLogoSVG from '$application/assets/service-logos/systemAdmin.svg';
import { Role } from '$service/groups/Role';

import { SidebarProps } from '../Sidebar';

type Config = {
  roles: Role[];
} & Omit<
  SidebarProps,
  'userData' | 'isOpen' | 'isDialogShown' | 'onToggle' | 'onWaffleClick' | 'onCloseClick'
>;

const services = [
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

const sidebarsConfig: Config[] = [
  {
    roles: [Role.SystemAdmin],
    header: {
      kind: 'Default',
    },
    sections: {
      Main: [
        // {
        //   href: '/management/dashboard',
        //   label: 'Dashboard',
        //   icon: <DashboardSVG />,
        // },
        // {
        //   href: '/management/inbox',
        //   label: 'Inbox',
        //   icon: <InboxSVG />,
        //   iconFilled: <InboxFilledSVG />,
        // },
        {
          href: '/management/allTask',
          label: 'All Tasks',
          icon: <Icon icon="activity" />,
        },
        // {
        //   href: '/management/reports',
        //   label: 'Reports',
        //   icon: <ReportSVG />,
        //   iconFilled: <ReportFilledSVG />,
        // },
      ],
      Report: [
        {
          href: '/management/reports',
          label: 'Reports',
          icon: <ReportSVG />,
          iconFilled: <ReportFillSVG />,
        },
      ],
      Management: [
        {
          href: '/management/policies',
          label: 'Policies',
          icon: <ShieldSVG />,
          iconFilled: <ShieldFilledSVG />,
        },
        {
          href: '/management/journals',
          label: 'Journals',
          icon: <JournalSVG />,
          iconFilled: <JournalFilledSVG />,
        },
        // {
        //   href: '/management/publishers',
        //   label: 'Publishers',
        //   icon: <PublisherSVG />,
        //   iconFilled: <PublisherFilledSVG />,
        // },
        // {
        //   href: '/management/vouchers',
        //   label: 'Vouchers',
        //   icon: <VoucherSVG />,
        // },
        // {
        //   href: '/management/funders',
        //   label: 'Funders',
        //   icon: <FunderSVG />,
        //   iconFilled: <FunderFilledSVG />,
        // },
        // {
        //   href: '/management/institutes',
        //   label: 'Institutes',
        //   icon: <InstituteSVG />,
        //   iconFilled: <InstituteFilledSVG />,
        // },
        // {
        //   href: '/management/users',
        //   label: 'Users',
        //   icon: <UsersSVG />,
        //   iconFilled: <UsersFilledSVG />,
        // },
        {
          href: '/management/message-templates',
          label: 'Message Templates',
          icon: <MessageSVG />,
          iconFilled: <MessageFilledSVG />,
        },
      ],
    },
    services,
    footer: {
      route: { href: '/management/profile', label: 'User profile' },
    },
  },
  {
    roles: [Role.FundManager],
    header: {
      kind: 'Default',
    },
    sections: {
      Main: [
        // {
        //   href: '/fundManager/dashboard',
        //   label: 'Dashboard',
        //   icon: <DashboardSVG />,
        // },
        {
          href: '/fundManager/inbox',
          label: 'Inbox',
          icon: <InboxSVG />,
          iconFilled: <InboxFilledSVG />,
        },
      ],
      Report: [
        {
          href: '/fundManager/reports',
          label: 'Reports',
          icon: <ReportSVG />,
          iconFilled: <ReportFillSVG />,
        },
      ],
      Management: [
        {
          href: '/fundManager/policies',
          label: 'Policies',
          icon: <ShieldSVG />,
          iconFilled: <ShieldFilledSVG />,
        },
        {
          href: '/fundManager/journals',
          label: 'Journals',
          icon: <JournalSVG />,
          iconFilled: <JournalFilledSVG />,
        },
        // {
        //   href: '/fundManager/publishers',
        //   label: 'Publishers',
        //   icon: <PublisherSVG />,
        //   iconFilled: <PublisherFilledSVG />,
        // },
        // {
        //   href: '/fundManager/vouchers',
        //   label: 'Vouchers',
        //   icon: <VoucherSVG />,
        // },
      ],
    },
    services,
    footer: {
      route: { href: '/fundManager/profile', label: 'User profile' },
    },
  },
  {
    roles: [Role.FundFinancialManager],
    header: {
      kind: 'Default',
    },
    sections: {
      Main: [
        {
          href: '/fundFinancialManager/inbox',
          label: 'Inbox',
          icon: <InboxSVG />,
          iconFilled: <InboxFilledSVG />,
        },
      ],
    },
    services,
    footer: {
      route: { href: '/fundFinancialManager/profile', label: 'User profile' },
    },
  },
  {
    roles: [Role.PublisherAdmin],
    header: {
      kind: 'Default',
    },
    sections: {
      Report: [
        {
          href: '/publisherAdmin/reports',
          label: 'Reports',
          icon: <ReportSVG />,
          iconFilled: <ReportFillSVG />,
        },
      ],
    },
    services,
    footer: {
      route: { href: '/publisherAdmin/profile', label: 'User profile' },
    },
  },
];

export default sidebarsConfig;
