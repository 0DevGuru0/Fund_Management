import React, { FC } from 'react';

import styled from 'styled-components';

import NoDocumentsSVG from '$application/assets/colored-icons/NoDocumentsSVG.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

export const NoJournals: FC = () => {
  return (
    <EmptyContentHolder
      icon={<NoDocuments />}
      title="No Journals Found"
      description="There is no journal available right now. You can add one manually."
      actionButton={
        <Button
          title="Add Journal"
          color="primary"
          leftIcon="plus"
          customSize="lg"
          variant="outlined"
        />
      }
    />
  );
};

export default NoJournals;

const NoDocuments = styled(NoDocumentsSVG)`
  width: 465px;
  height: 200px;
`;
