import React from 'react';

import styled from 'styled-components';

import NoDocumentsSVG from '$application/assets/colored-icons/NoDocumentsSVG.svg';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

export const EmptyInvoices = () => {
  return (
    <EmptyResultContainer>
      <EmptyContentHolder
        icon={<NoDocuments />}
        title="Not have any invoices"
        description="You do not have any invoices on your list."
      />
    </EmptyResultContainer>
  );
};

export default EmptyInvoices;

const EmptyResultContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NoDocuments = styled(NoDocumentsSVG)`
  width: 250px;
  height: 200px;
  margin-top: 148px;
`;
