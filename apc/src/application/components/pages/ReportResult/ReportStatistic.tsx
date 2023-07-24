import React, { FC } from 'react';

import styled from 'styled-components';

export interface ReportStatisticProps {
  totalCount: number;
  totalPrice: number;
}

const ReportStatistic: FC<ReportStatisticProps> = ({ totalCount, totalPrice }) => {
  return (
    <Container>
      <Item>
        <Count>{totalCount}</Count>
        <Hint>Total count</Hint>
      </Item>
      <Item>
        <Count>$ {totalPrice.toLocaleString('en-us')}</Count>
        <Hint>Total price</Hint>
      </Item>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: end;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 35px;
  padding: 5px;
`;

const Count = styled.div`
  margin-bottom: 15px;
  font-weight: bolder;
  font-size: 20px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Hint = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export default ReportStatistic;
