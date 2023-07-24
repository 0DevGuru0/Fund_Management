import React, { useEffect } from 'react';

import { useAtomValue } from 'jotai/utils';
import { isNil, omitBy } from 'lodash';
import { NextPage } from 'next';
import router from 'next/router';

import {
  useGetPolicies,
  useGetVouchersOfPolicy,
} from '$application/lib/generated/apcApi';

import PolicyDetails from '../templates/PolicyDetails';
import { vouchersPerPage } from '../templates/PolicyDetails/config';
import {
  IPolicyDetailsContext,
  PolicyDetailsContext,
} from '../templates/PolicyDetails/PolicyDetailsContext';

import {
  currentVoucherPageAtom,
  voucherFilterOptionsAtom,
  voucherSortOptionAtom,
} from './PolicyDetails/store';

export interface PageProps {
  policyId?: string;
  type: 'management' | 'fundManager';
}
export const PolicyDetailsPage: NextPage<PageProps> = ({ policyId, type }) => {
  const filterOptions = useAtomValue(voucherFilterOptionsAtom);
  const currentPage = useAtomValue(currentVoucherPageAtom);

  const onVoucherClick = (voucherId: string) => {
    router.push(`/${type}/policy/${policyId}/${voucherId}`);
  };

  const policyDetailsContext: IPolicyDetailsContext = {
    currentVoucherPageAtom,
    onVoucherClick,
    voucherFilterOptionsAtom,
    voucherSortOptionAtom,
  };
  const policyData = useGetPolicies(
    {
      id: policyId,
      fields: 'journalGroups',
    },
    { query: { enabled: !!policyId } },
  );

  const vouchersData = useGetVouchersOfPolicy(
    policyId ?? '',
    omitBy(
      {
        code: filterOptions.searchPhrase,
        status:
          filterOptions.states?.length !== 1
            ? undefined
            : (filterOptions.states[0] as string).toUpperCase(),
        limit: vouchersPerPage.toString(),
        skip: ((currentPage - 1) * vouchersPerPage).toString(),
      },
      isNil,
    ),
    {
      query: {
        enabled:
          !policyData.isLoading && policyData.data?.policies?.[0]?.type === 'VOUCHER',
      },
    },
  );

  useEffect(() => {
    router.prefetch(`/${type}/policy/[policyId]/[voucher.id]`);
  }, [vouchersData.data, policyId, type]);

  return (
    <PolicyDetailsContext.Provider value={policyDetailsContext}>
      <PolicyDetails vouchersData={vouchersData} policyData={policyData} />
    </PolicyDetailsContext.Provider>
  );
};

export default PolicyDetailsPage;
