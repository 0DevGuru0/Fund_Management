import React, { FC } from 'react';

import styled from 'styled-components';

import { ReportResultProps } from '../ReportResult';

import ReportFilterChip from './ReportFilterChip';

export interface FilterItem {
  label?: string;
  titles?: string;
}

const ReportResultChip: FC<ReportResultProps> = (props) => {
  const filterItems: FilterItem[] = [];
  if (props.type) {
    if (props.type !== 'None') {
      filterItems.push({
        label: 'ReportType',
        titles: props.type,
      });
    }
  }
  if (props.fundIds) {
    filterItems.push({
      label: 'FundIds',
      titles: props.fundTitles,
    });
  }
  if (props.publisherIds) {
    filterItems.push({
      label: 'PublisherIds',
      titles: props.publisherTitles,
    });
  }
  if (props.affiliationIds) {
    filterItems.push({
      label: 'AffiliationIds',
      titles: props.affiliationTitles,
    });
  }
  if (props.journalIds) {
    filterItems.push({
      label: 'JournalIds',
      titles: props.journalTitles,
    });
  }
  if (props.policyIds) {
    filterItems.push({
      label: 'PolicyIds',
      titles: props.policyTitles,
    });
  }
  if (props.state) {
    filterItems.push({
      label: 'States',
      titles: props.state,
    });
  }
  if (props.startDate) {
    filterItems.push({
      label: 'StartDate',
      titles: props.startDate,
    });
  }
  if (props.endDate) {
    filterItems.push({
      label: 'EndDate',
      titles: props.endDate,
    });
  }

  return (
    <ReportResultChipContainer>
      <ReportTitle>Report Result</ReportTitle>
      <ChipContainer>
        {filterItems?.map((item, index) => (
          <ReportFilterChip key={index} title={item.label} items={item.titles} />
        ))}
      </ChipContainer>
    </ReportResultChipContainer>
  );
};

export default ReportResultChip;

const ReportResultChipContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const ReportTitle = styled.div`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bolder;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const ChipContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
`;
