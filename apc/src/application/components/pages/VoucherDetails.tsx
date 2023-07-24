import React, { useEffect } from 'react';

import { isEmpty } from 'lodash';
import styled from 'styled-components';

import {
  useGetFundApplications,
  useGetPolicies,
  useGetVoucherById,
} from '$application/lib/generated/apcApi';

import { LoadingData } from '../atoms/etc/LoadingData';

import ManagementVoucherDetailsBody from './VoucherDetails/ManagementVoucherDetailsBody';
import ManagementVoucherDetailsHeader from './VoucherDetails/ManagementVoucherDetailsHeader';
import ManagementVoucherDetailsSidebar from './VoucherDetails/ManagementVoucherDetailsSidebar';

interface ManagementVoucherDetailsProps {
  policyId: string;
  voucherId: string;
}

export const ManagementVoucherDetails = (props: ManagementVoucherDetailsProps) => {
  const voucherData = useGetVoucherById({
    voucherId: props.voucherId,
  });

  const policyData = useGetPolicies({
    id: props.policyId,
    fields: 'journalGroups',
  });

  const fundApplication = useGetFundApplications(
    {
      fundApplicationIds: String(voucherData.data?.fundApplicationId),
    },
    { query: { enabled: false } },
  );

  useEffect(() => {
    if (voucherData.data?.fundApplicationId && isEmpty(fundApplication.data)) {
      fundApplication.refetch();
    }
  }, [voucherData.data?.fundApplicationId, fundApplication]);

  const isLoading =
    policyData.isLoading || voucherData.isLoading || fundApplication.isLoading;

  const error = policyData.error ?? voucherData.error ?? fundApplication.error;

  return (
    <LoadingData loading={isLoading} error={error}>
      {() => (
        <>
          {voucherData.data && !isEmpty(policyData.data?.policies) && (
            <VoucherDetailWrapper>
              <ManagementVoucherDetailsHeader
                voucherData={voucherData.data}
                policyData={policyData.data}
              />
              <Wrapper>
                <StyledBody
                  voucherData={voucherData.data}
                  policyData={policyData.data!}
                  fundApplicationData={fundApplication.data?.fundApplications?.[0]}
                />
                <StyledSidebar voucher={voucherData.data} />
              </Wrapper>
            </VoucherDetailWrapper>
          )}
        </>
      )}
    </LoadingData>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const StyledBody = styled(ManagementVoucherDetailsBody)`
  flex: 1;
  margin-left: 131px;
  margin-top: 36px;
`;

const StyledSidebar = styled(ManagementVoucherDetailsSidebar)`
  box-sizing: border-box;
  width: 238px;
  height: 294px;
  margin-left: 24px;
  margin-right: 36px;
  padding: 36px;
  padding-bottom: 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.grey['400']};
`;

const VoucherDetailWrapper = styled.div`
  margin-left: 36px;
`;

export default ManagementVoucherDetails;
