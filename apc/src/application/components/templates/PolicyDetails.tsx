import React, { useState } from 'react';

import { compact, keyBy } from 'lodash';
import styled from 'styled-components';

import ShieldFillSVG from '$application/assets/icons/shield-fill.svg';
import { GeneralInfo as GeneralTab } from '$application/components/molecules/cards/GeneralInfo';
import {
  GetPolicies200,
  GetVouchersOfPolicy200,
} from '$application/lib/generated/apcApi.schemas';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';
import { TaskNameNormalizer } from '$application/lib/taskToColor';

import EmptyInvoices from './PolicyDetails/EmptyInvoices';
import PolicyCard, { PolicyInfo } from './PolicyDetails/PolicyCard';
import PolicyControl from './PolicyDetails/PolicyControl';
import voucherApiToVoucherTableItem from './PolicyDetails/voucherApiToVoucherTableItem';
import VouchersChart from './PolicyDetails/VouchersChart';
import VouchersTable from './PolicyDetails/VouchersTable';

import { hideScrollBar } from '$utils';

export enum TabsType {
  DetailsTab = 'General Information',
  VouchersTab = 'Vouchers Data',
  TransactionsTab = 'Transactions',
}

const VoucherTypeTabs = [TabsType.VouchersTab, TabsType.DetailsTab];
const InvoiceTypeTabs = [TabsType.TransactionsTab, TabsType.DetailsTab];

interface IPolicyData {
  isLoading: boolean;
  data?: GetPolicies200;
}

interface IVouchersData {
  data?: GetVouchersOfPolicy200;
  error?: any;
  isFetching: boolean;
}

export interface PolicyDetailsProps {
  policyData: IPolicyData;
  vouchersData: IVouchersData;
}

const PolicyDetails = ({ policyData, vouchersData }: PolicyDetailsProps) => {
  const [activeTab, setActiveTab] = useState(TabsType.DetailsTab);

  const policy = React.useMemo(() => policyData.data?.policies?.[0], [
    policyData.data?.policies,
  ]);
  React.useEffect(
    () =>
      setActiveTab(
        policy?.type === 'VOUCHER' ? TabsType.VouchersTab : TabsType.TransactionsTab,
      ),
    [policy?.type],
  );

  const [titles] = useGetTitleByIdsQuery({
    variables: {
      ids: compact([policy?.fundId, policy?.publisherId]),
    },
  });

  const titlesMap = keyBy(titles.data?.getItems ?? [], 'id');

  const additionalInfo = [
    { label: 'Funder', value: titlesMap?.[policy?.fundId ?? '']?.title },
    ...(policy?.publisherId
      ? [
          {
            label: 'Publisher',
            value: titlesMap?.[policy?.publisherId ?? '']?.title,
          },
        ]
      : []),
  ];

  let voucherCount = 0;
  let voucherAllocatedCount = 0;
  let voucherAvailableCount = 0;
  let voucherReservedCount = 0;
  let voucherSuspendedCount = 0;
  if (vouchersData.data) {
    voucherAllocatedCount = vouchersData.data.counts?.ALLOCATED ?? 0;
    voucherAvailableCount = vouchersData.data.counts?.AVAILABLE ?? 0;
    voucherReservedCount = vouchersData.data.counts?.RESERVED ?? 0;
    voucherSuspendedCount = vouchersData.data.counts?.SUSPENDED ?? 0;

    voucherCount =
      voucherAllocatedCount +
      voucherAvailableCount +
      voucherReservedCount +
      voucherSuspendedCount;
  }

  if (policyData.isLoading || !policy) {
    return null;
  }

  const policyInfo: PolicyInfo = {
    id: policy.id,
    state: TaskNameNormalizer[policy.isActive ? 'ACTIVE' : 'Suspended'],
    title: policy.title,
    type: policy.type,
    journalGroups: policy.journalGroups,
  };

  return (
    <>
      <PolicyCard
        tabs={policy.type === 'VOUCHER' ? VoucherTypeTabs : InvoiceTypeTabs}
        activeTab={activeTab}
        onChangeTab={(item) => setActiveTab(item)}
        icon={<ShieldFillSVG />}
        policy={policyInfo}
        hasNotification={false}
        actions={<PolicyControl policy={policy} />}
      />
      <Container>
        {activeTab === TabsType.DetailsTab && (
          <GeneralTab
            descriptionTitle="Terms"
            description={policy.terms}
            additionalInfo={additionalInfo}
          />
        )}
        {activeTab === TabsType.VouchersTab && (
          <VouchersTable
            count={voucherCount}
            hasError={!!vouchersData.error}
            isLoading={vouchersData.isFetching}
            tableItems={voucherApiToVoucherTableItem(
              vouchersData.data?.vouchers ?? [],
              titlesMap,
            )}
          />
        )}
        {policy.type === 'VOUCHER' && (
          <VouchersChart
            allocatedCount={voucherAllocatedCount}
            availableCount={voucherAvailableCount}
            reservedCount={voucherReservedCount}
            suspendedCount={voucherSuspendedCount}
          />
        )}
        {policy.type === 'INVOICE' && <EmptyInvoices />}
      </Container>
    </>
  );
};

const Container = styled.div`
  ${hideScrollBar};
  padding: 36px 36px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: row;
  gap: 36px;
`;

export default PolicyDetails;
