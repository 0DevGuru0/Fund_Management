import React from 'react';

import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import ShieldSVG from '$application/assets/icons/shield-fill.svg';
import TicketSVG from '$application/assets/icons/ticket.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';
import {
  GetPolicies200,
  GetVoucherById200,
} from '$application/lib/generated/apcApi.schemas';
import { taskToColor } from '$application/lib/taskToColor';

import { IconWrapper } from './sharedStyled';

interface Props {
  voucherData: GetVoucherById200;
  policyData?: GetPolicies200;
}

export const ManagementVoucherDetailsHeader = ({ voucherData, policyData }: Props) => {
  const voucherStatus = capitalize(voucherData.status);
  return (
    <>
      <Link href={`/management/policy/${policyData?.policies?.[0].id}`}>
        <IconButton
          color="Primary"
          variant="WithText"
          icon={<ArrowSVG />}
          style={BackButton}
          title="Back to vouchers list"
        />
      </Link>
      <TitleWrapper>
        <IconContainer>
          <TicketSVG />
        </IconContainer>
        <TitleContainer>
          <Title>
            <span>{voucherData.code}</span>
            <State background={taskToColor[voucherStatus]}>{voucherStatus}</State>
          </Title>
          <SubTitle>
            <StyledIconWrapper $size="20">
              <ShieldSVG />
            </StyledIconWrapper>
            <Type>{capitalize(policyData?.policies?.[0].title)}</Type>
          </SubTitle>
          <CreatedAtDate>
            {dayjs(policyData?.policies?.[0].createdAt as string).format('DD MMM YYYY')}
          </CreatedAtDate>
        </TitleContainer>
      </TitleWrapper>
    </>
  );
};
const StyledIconWrapper = styled(IconWrapper)`
  margin-left: 0px !important;
  height: 20px;
  svg {
    use,
    path {
      fill: ${({ theme }) => theme.palette.grey['700']};
    }
  }
`;
const BackButton = css`
  margin-top: 24px;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-left: 6px;
  }
`;

const CreatedAtDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey['700']};
`;

const IconContainer = styled.div`
  width: 107px;
  height: 107px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 60px;
    height: 60px;
    path,
    use {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 48px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-right: 12px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const State = styled.span<{ background: string }>`
  display: inline-block;
  padding: 3px 12px;
  font-weight: bold;
  line-height: 18px;
  width: max-content;
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.background.primary};
  background-color: ${({ background }) => background};
`;

const Type = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey['800']};
`;
export default ManagementVoucherDetailsHeader;
