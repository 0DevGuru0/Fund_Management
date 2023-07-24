import React, { FC } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import ArrowLeft from '$application/assets/icons/arrow-left.svg';
import Info from '$application/assets/icons/info.svg';
import footerConfig from '$application/components/atoms/etc/Footer/footer.config';
import { Table } from '$application/components/organisms/tables/Table';
import { useGetFundApplications } from '$application/lib/generated/apcApi';

import { Footer } from '../atoms/etc/Footer';

import { reportTableDefinitions } from './ReportResult/config';
import ReportResultChip from './ReportResult/ReportResultChips';
import ReportResultControl from './ReportResult/ReportResultControl';
import ReportStatistic from './ReportResult/ReportStatistic';
import { useTableItems } from './ReportResult/useTableItems';

export interface ReportResultProps {
  type?: 'None' | 'Only invoice Request' | 'Only Voucher Request';
  fundIds?: string;
  fundTitles?: string;
  publisherIds?: string;
  publisherTitles?: string;
  affiliationIds?: string;
  affiliationTitles?: string;
  journalIds?: string;
  journalTitles?: string;
  policyIds?: string;
  policyTitles?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
}

const ReportResult: FC<ReportResultProps> = (props: ReportResultProps) => {
  let policyType;
  let fundState;

  if (props.type) {
    switch (props.type) {
      case 'Only Voucher Request':
        policyType = 'VOUCHER';
        break;
      case 'Only invoice Request':
        policyType = 'INVOICE';
        break;
    }
  }

  if (props.state) {
    switch (props.state) {
      case 'In Progress':
        fundState = 'STARTED,PROCESS_PAYMENT,PRE_APPROVE_INVOICE_PAYMENT';
        break;
      case 'Pending':
        fundState = 'UPLOAD_JOURNAL_INVOICE,UPLOAD_ACCEPTANCE_LETTER';
        break;
      case 'Completed':
        fundState = 'FINISHED,APPROVE_VOUCHER,APPROVE_INVOICE';
        break;
    }
  }
  const applications = useGetFundApplications({
    fundIds: props.fundIds,
    affiliationIds: props.affiliationIds,
    publisherIds: props.publisherIds,
    journalIds: props.journalIds,
    states: fundState,
    startDate: props.startDate,
    endDate: props.endDate,
    limit: '5',
    policyType,
  });

  const { tableItems } = useTableItems({
    applications: applications.data?.fundApplications ?? [],
  });

  const router = useRouter();

  return (
    <Container>
      <Header>
        <ReportResultControl
          states={fundState}
          fundIds={props.fundIds}
          publisherIds={props.publisherIds}
          journalIds={props.journalIds}
          affiliationIds={props.affiliationIds}
          startDate={props.startDate}
          endDate={props.endDate}
          type={policyType}
        />
      </Header>
      <BackSection>
        <DescriptionContainer
          onClick={() => {
            router.back();
          }}
        >
          <Icon>
            <ArrowLeft />
          </Icon>
          Back to Filter Options
        </DescriptionContainer>
      </BackSection>
      <ReportResultSection>
        <ReportResultChip {...props} />
        <ReportResultStatistic>
          <ReportStatistic
            totalCount={Number(applications.data?.count)}
            totalPrice={Number(applications.data?.totalPrice)}
          />
        </ReportResultStatistic>
      </ReportResultSection>
      <DescriptionContainer>
        <IconInfo>
          <Info />
        </IconInfo>
        To know the accuracy of your information, you can see a small part of the report
        that is the result of your filter, and if it is confirmed, you wll receive its
        output as an Excel file with more additional information.
      </DescriptionContainer>
      {applications?.data?.fundApplications && (
        <TableWrapper>
          <Table
            isLastFixed={false}
            items={tableItems}
            definitions={reportTableDefinitions}
          />
        </TableWrapper>
      )}

      <Footer narrowPadding={false} footerConfig={footerConfig} />
    </Container>
  );
};

export default ReportResult;

const TableWrapper = styled.div`
  margin: 40px 0;
`;
const Container = styled.div`
  padding: 48px 36px;
  padding-bottom: 0px;
  margin-bottom: 20px;
`;

const BackSection = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[700]};
  cursor: pointer;
  margin: 15px 0;
`;

const Icon = styled.div`
  margin-right: 5px;
  display: inline-block !important;
  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[700]} !important;
    }
  }
`;

const IconInfo = styled.div`
  margin-right: 5px;
  background-color: ${({ theme }) => theme.link.back} !important;
  padding: 2px;
  border-radius: 50px;
  height: 20px;
  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.link.hover} !important;
    }
  }
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const ReportResultSection = styled.div`
  display: flex;
  flex-direction: row;
  margin: 36px 0;
`;

const ReportResultStatistic = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;
