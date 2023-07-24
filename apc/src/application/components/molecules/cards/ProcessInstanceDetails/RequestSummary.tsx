import React, { FC } from 'react';

import getSymbolFromCurrency from 'currency-symbol-map';
import numeral from 'numeral';
import styled from 'styled-components';

export interface RequestSummaryProps {
  publisher: string;
  journal?: string;
  price: number;
  subjectCategory: string;
  mainSubject: string;
  className?: string;
  currency: string;
}

export const RequestSummary: FC<RequestSummaryProps> = ({
  publisher,
  journal,
  price,
  subjectCategory,
  mainSubject,
  className,
  currency,
}) => (
  <Container className={className}>
    <Header>Summary of Application</Header>
    <RowItem>
      <RowLabel>Publisher</RowLabel>
      <RowInfo>{publisher}</RowInfo>
    </RowItem>
    <RowItem>
      <RowLabel>Journal</RowLabel>
      <RowInfo>{journal}</RowInfo>
    </RowItem>
    <RowItem>
      <RowLabel>Price</RowLabel>
      <RowInfo>
        {numeral(price).format('0,0')}
        <Currency>{getSymbolFromCurrency(currency)}</Currency>
      </RowInfo>
    </RowItem>
    <RowItem>
      <RowLabel>Category</RowLabel>
      <RowInfo>{subjectCategory}</RowInfo>
    </RowItem>
    <RowItem>
      <RowLabel>Main Subject</RowLabel>
      <RowInfo>{mainSubject}</RowInfo>
    </RowItem>
  </Container>
);

export default RequestSummary;

const Container = styled.div`
  width: 490px;
  & > * {
    padding: 26px 24px 0 36px;
  }
`;

const Header = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const RowItem = styled.div`
  display: flex;
`;

const RowLabel = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.link.text};
  flex: 1;
`;

const RowInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text.contrast.secondary};
  flex: 2;
  display: flex;
  justify-content: space-between;
`;
const Currency = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey[500]};
  & > svg path,
  use {
    fill: ${({ theme }) => theme.palette.grey[800]};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;
