import React, { FC } from 'react';

import styled from 'styled-components';

import NoDocumentsSVG from '$application/assets/colored-icons/NoDocumentsSVG.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

import useHandleWizardOpen from './useHandleWizardOpen';

export const EmptyPage: FC = () => {
  const handleWizardOpen = useHandleWizardOpen();
  const actionButton = (
    <Button
      onClick={handleWizardOpen}
      title="Add new"
      color="primary"
      leftIcon="plus"
      customSize="lg"
      variant="outlined"
    />
  );

  return (
    <EmptyResultContainer>
      <EmptyContentHolder
        icon={<NoDocuments />}
        title="Not have any Policies"
        description="You do not have any Policies on your list and you can add them if possible."
        actionButton={actionButton}
      />
    </EmptyResultContainer>
  );
};

export default EmptyPage;

const EmptyResultContainer = styled.div`
  padding: 36px;
  flex: 1;
`;

const NoDocuments = styled(NoDocumentsSVG)`
  width: 250px;
  height: 200px;
  margin-top: 148px;
`;
