import React, { FC } from 'react';

import styled from 'styled-components';

import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

export const EmptyTable: FC = () => (
  <EmptyResultContainer>
    <EmptyContentHolder
      icon={<NoSearchResult src="/nothingToCompare.png" />}
      title="No Result Found"
      description="Try changing the filters or search term"
    />
  </EmptyResultContainer>
);

export default EmptyTable;

const NoSearchResult = styled.img`
  width: 465px;
  height: 200px;
  margin-bottom: 12px;
`;

const EmptyResultContainer = styled.div`
  padding: 36px;
`;
