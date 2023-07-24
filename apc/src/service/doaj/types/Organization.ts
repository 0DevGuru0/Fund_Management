import { Organization as Org } from '$service/generated/repoGqlTypes';

import { OrganizationType } from './OrganizationType';
import { RepoTypes } from './RepoTypes';

export type Organization = {
  type: OrganizationType;
} & Omit<Org, RepoTypes | 'type'>;
