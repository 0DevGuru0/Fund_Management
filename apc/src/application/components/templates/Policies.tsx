import React, { useContext, useMemo } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty, keyBy } from 'lodash';
import { QueryKey, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { GaugeChart } from '$application/components/molecules/charts/GaugeChart';
import { CreatePolicyWizard } from '$application/components/organisms/wizards/CreatePolicyWizard';
import { GetPolicies200 } from '$application/lib/generated/apcApi.schemas';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';

import EmptyPage from './Policies/EmptyPage';
import {
  PoliciesApiResponse,
  processPoliciesChartData,
} from './Policies/policiesChartDataProcess';
import { PoliciesContext } from './Policies/PoliciesContext';
import PoliciesControl from './Policies/PoliciesControl';
import PoliciesTable from './Policies/PoliciesTable';
import policyApiToPolicyTableItem from './Policies/policyApiToPolicyTableItem';

interface PoliciesData {
  data?: GetPolicies200;
  isFetching: boolean;
  error: any;
  queryKey: QueryKey;
}

export interface PoliciesProps {
  policiesData: PoliciesData;
}

const Policies = ({ policiesData }: PoliciesProps) => {
  const { showCreatePolicyWizardAtom, filterOptionsAtom } = useContext(PoliciesContext);

  const filterOptions = useAtomValue(filterOptionsAtom);
  const [wizardOpen, setWizardOpen] = useAtom(showCreatePolicyWizardAtom);
  const { error, isFetching, queryKey, data } = policiesData;
  const queryClient = useQueryClient();

  const activeCount = data?.activeCount ?? 0;
  const inactiveCount = data?.inactiveCount ?? 0;
  const count = activeCount + inactiveCount;

  const ids = useMemo<string[]>(() => {
    const set = new Set<string>();
    data?.policies?.forEach((p) => {
      if (p.publisherId) {
        set.add(p.publisherId as string);
      }
      if (p.fundId) {
        set.add(p.fundId as string);
      }
    });
    return Array.from(set);
  }, [data?.policies]);

  const [titles] = useGetTitleByIdsQuery({
    variables: {
      ids,
    },
  });

  const titlesMap = useMemo(() => keyBy(titles.data?.getItems ?? [], 'id'), [
    titles.data,
  ]);

  const policiesCountApiResponse: PoliciesApiResponse[] = [
    { label: 'Active', count: activeCount },
    { label: 'Suspended', count: inactiveCount },
  ];

  return (
    <>
      {count === 0 && !isFetching && isEmpty(filterOptions) ? (
        <EmptyPage />
      ) : (
        <LoadingData
          loading={titles.fetching && isFetching && isEmpty(filterOptions)}
          error={error}
        >
          {() => (
            <Container>
              <Header>
                <ChartWrapper>
                  <GaugeChart
                    items={processPoliciesChartData(policiesCountApiResponse)}
                  />
                </ChartWrapper>
                <PoliciesControl />
              </Header>
              <PoliciesTable
                count={count}
                hasError={!!error}
                isLoading={isFetching}
                tableItems={policyApiToPolicyTableItem(data?.policies ?? [], titlesMap)}
              />
            </Container>
          )}
        </LoadingData>
      )}
      <CreatePolicyWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onDone={() => {
          queryClient.refetchQueries(queryKey);
        }}
      />
    </>
  );
};

export default Policies;

const Container = styled.div`
  padding: 48px 36px;
  padding-bottom: 0px;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const ChartWrapper = styled.div`
  flex: 1;
`;
