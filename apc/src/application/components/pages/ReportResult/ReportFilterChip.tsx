import React, { FC } from 'react';

import styled from 'styled-components';

export interface ReportFilterChipProps {
  title?: string;
  items?: string;
}

const ReportFilterChip: FC<ReportFilterChipProps> = ({ title, items }) => {
  if (title && items) {
    return (
      <Container>
        {title}: {items}
      </Container>
    );
  } else {
    return <></>;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.primaryLight};
  color: ${({ theme }) => theme.palette.grey[800]};
  font-size: 14.4px;
`;

export default ReportFilterChip;
