import React, { FC } from 'react';

import { IHistoryStep } from '$application/components/molecules/etc/Breadcrumb';
import DocsLayout, { DocsProps } from '$application/components/templates/DocsLayout';
import ManagementLayout from '$application/components/templates/ManagementLayout';
import ResearcherLayout from '$application/components/templates/ResearcherLayout';
import { Role } from '$service/groups/Role';

export interface PageProps {
  docsProps?: DocsProps;
  children?: JSX.Element;
  breadcrumbs?: IHistoryStep[];
  authorizeRole?: keyof typeof Role;
  pageLayout?:
    | 'Management'
    | 'Researcher'
    | 'FundManager'
    | 'PublisherAdmin'
    | 'FundFinancialManager'
    | 'Docs';
}

export const Layout: FC<PageProps> = (props) => {
  switch (props.pageLayout) {
    case 'Management':
      return (
        <ManagementLayout
          breadcrumbs={props.breadcrumbs}
          authorizeRole={props.authorizeRole ?? 'SystemAdmin'}
        >
          {props.children}
        </ManagementLayout>
      );
    case 'Researcher':
      return <ResearcherLayout>{props.children}</ResearcherLayout>;
    case 'FundManager':
      return (
        <ManagementLayout
          breadcrumbs={props.breadcrumbs}
          authorizeRole={props.authorizeRole ?? 'FundManager'}
        >
          {props.children}
        </ManagementLayout>
      );
    case 'FundFinancialManager':
      return (
        <ManagementLayout
          breadcrumbs={props.breadcrumbs}
          authorizeRole={props.authorizeRole ?? 'FundFinancialManager'}
        >
          {props.children}
        </ManagementLayout>
      );
    case 'PublisherAdmin':
      return (
        <ManagementLayout
          breadcrumbs={props.breadcrumbs}
          authorizeRole={props.authorizeRole ?? 'PublisherAdmin'}
        >
          {props.children}
        </ManagementLayout>
      );
    case 'Docs':
      return <DocsLayout docsProps={props.docsProps}>{props.children}</DocsLayout>;
    default:
      return <>{props.children}</>;
  }
};

export default Layout;
