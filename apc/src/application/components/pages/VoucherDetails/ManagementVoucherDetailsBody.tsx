import React from 'react';

import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import {
  GetFundApplications200FundApplicationsItem,
  GetPolicies200,
  GetVoucherById200,
} from '$application/lib/generated/apcApi.schemas';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';

import Article from './ManagementVoucherDetailsBody/Article';
import Process from './ManagementVoucherDetailsBody/Process';
import { BlackText, Cell, Label } from './sharedStyled';

interface Props {
  className?: string;
  voucherData: GetVoucherById200;
  policyData: GetPolicies200;
  fundApplicationData?: GetFundApplications200FundApplicationsItem;
}

export const ManagementVoucherDetailsBody = ({
  voucherData: voucher,
  className,
  policyData,
  fundApplicationData,
}: Props) => {
  const [titlesData] = useGetTitleByIdsQuery({
    variables: {
      ids: [
        voucher.publisherId,
        ...(fundApplicationData?.affiliationId && fundApplicationData?.fundId
          ? [fundApplicationData?.fundId, fundApplicationData?.affiliationId]
          : []),
      ],
    },
  });

  const titles = (titlesData.data?.getItems ?? []).map((item) => item.title);

  return (
    <div className={className}>
      <LoadingData loading={titlesData.fetching} error={titlesData.error}>
        {() => (
          <>
            {voucher.note && (
              <Cell>
                <Label>Note</Label>
                <BlackText>{voucher.note}</BlackText>
              </Cell>
            )}
            <InnerBox>
              <Cell>
                <Label>Publisher</Label>
                <BlackText bold>{titles[0] ?? '-'}</BlackText>
              </Cell>
              <Cell>
                <Label>Fund</Label>
                <BlackText bold>{titles[1] ?? '-'}</BlackText>
              </Cell>
              <BottomCell>
                <Label>Submitted by</Label>
                <User>
                  <UserImage src={'/defaultUser.png'} />
                  <BlackText>{policyData.policies?.[0].createdBy}</BlackText>
                </User>
              </BottomCell>
              <BottomCell>
                <Label>Process</Label>
                <Process status={voucher.status} user={fundApplicationData?.userId!} />
              </BottomCell>
            </InnerBox>
            <Article
              affiliationTitle={titles[2]}
              fundApplicationData={fundApplicationData}
            />
          </>
        )}
      </LoadingData>
    </div>
  );
};

const BottomCell = styled(Cell)`
  margin-bottom: 0;
`;

export const UserImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 6px;
`;

const InnerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    flex-basis: 50%;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export default ManagementVoucherDetailsBody;
