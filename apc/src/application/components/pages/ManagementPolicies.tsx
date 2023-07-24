import React, { useEffect } from 'react';

import { useAtomValue, useResetAtom } from 'jotai/utils';
import { isNil, omitBy } from 'lodash';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGetPolicies } from '$application/lib/generated/apcApi';

import Policies from '../templates/Policies';
import { policiesPerPage } from '../templates/Policies/config';
import { IPoliciesContext, PoliciesContext } from '../templates/Policies/PoliciesContext';

import {
  currentPageAtom,
  policiesFilterOptionsAtom,
  showCreatePolicyWizardAtom,
  policiesSortOptionAtom,
  filterCardOpenAtom,
} from './ManagementPolicies/store';

export const ManagementPolicies: NextPage = () => {
  const router = useRouter();
  const filterOptions = useAtomValue(policiesFilterOptionsAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const resetCurrentPage = useResetAtom(currentPageAtom);
  const resetFilterOptions = useResetAtom(policiesFilterOptionsAtom);

  const policiesData = useGetPolicies(
    omitBy(
      {
        fields: 'journalGroups',
        isActive:
          filterOptions.states?.length !== 1
            ? undefined
            : filterOptions.states.includes('Active' as any)
            ? 'true'
            : 'false',
        type:
          filterOptions.type?.length !== 1
            ? undefined
            : (filterOptions.type[0] as string).toUpperCase(),
        title: filterOptions.searchPhrase,
        limit: policiesPerPage.toString(),
        skip: ((currentPage - 1) * policiesPerPage).toString(),
      },
      isNil,
    ),
  );

  useEffect(() => {
    resetCurrentPage();
  }, [filterOptions]);

  useEffect(() => {
    resetFilterOptions();
  }, []);

  const onPolicyTableRowClick = (policyId) =>
    router.push(`/management/policy/${policyId}`);

  const policiesContext: IPoliciesContext = {
    currentPageAtom,
    filterCardOpenAtom,
    showCreatePolicyWizardAtom,
    sortOptionAtom: policiesSortOptionAtom,
    filterOptionsAtom: policiesFilterOptionsAtom,
    onPolicyTableRowClick,
  };

  return (
    <PoliciesContext.Provider value={policiesContext}>
      <Policies policiesData={policiesData} />
    </PoliciesContext.Provider>
  );
};

export default ManagementPolicies;
