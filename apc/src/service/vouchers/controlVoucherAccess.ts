import { isResearcherOnly } from '$service/auth/isResearcherOnly';
import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';

import { Voucher } from '.prisma/backend-client';

export const controlVoucherAccess = (
  roles: TitleOrganization,
  voucher?: Voucher,
): Voucher | undefined => {
  if (!voucher) {
    return undefined;
  }
  const researcherOnly = isResearcherOnly(roles);
  if (!researcherOnly || voucher?.status === 'ALLOCATED') {
    return voucher;
  }
  return undefined;
};
