import { IHistoryStep } from '$application/components/molecules/etc/Breadcrumb';
import { Role } from '$service/groups/Role';

export interface ManagementPageProps {
  pageLayout: 'Management' | 'FundManager';
  breadcrumbs: IHistoryStep[];
  authorizeRole?: keyof typeof Role;
}

export interface ResearcherPageProps {
  pageLayout: 'Researcher';
}
