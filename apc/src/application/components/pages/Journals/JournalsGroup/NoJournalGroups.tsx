import React, { FC } from 'react';

import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';

import NoDocumentsSVG from '$application/assets/colored-icons/NoDocumentsSVG.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

import { showCreateGroupAtom } from '../store';

export const NoJournalGroups: FC = () => {
  const setShowCreateGroup = useUpdateAtom(showCreateGroupAtom);

  return (
    <EmptyContentHolder
      icon={<NoDocuments />}
      title="No Journal Groups Found"
      description="You do not have any journal groups! You can easily make one."
      actionButton={
        <Button
          title="Create group"
          color="primary"
          leftIcon="plus"
          customSize="lg"
          variant="outlined"
          onClick={() => setShowCreateGroup(true)}
        />
      }
    />
  );
};

export default NoJournalGroups;

const NoDocuments = styled(NoDocumentsSVG)`
  width: 465px;
  height: 200px;
`;
