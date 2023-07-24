import { GroupInput } from './getOrMakeCamundaGroup';

export const roleSeparator = 'ORGID';

// FundManager of the Org 123 would have the FundManager${roleSeparator}123 group=
export const generateGroupId = (group: GroupInput): string =>
  `${group.type}${roleSeparator}${group.organizationId ?? ''}`;
