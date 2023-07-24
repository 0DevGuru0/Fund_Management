/* eslint-disable no-console */
import React, { FC } from 'react';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { useQueryClient } from 'react-query';

import AddJournalToGroupModal, {
  AddJournalToGroupResponse,
} from '$application/components/molecules/modals/AddJournalToGroupModal';
import { CreateGroupModal } from '$application/components/molecules/modals/CreateGroupModal';
import {
  getGetJournalGroupsQueryKey,
  getGetJournalsOfJournalGroupQueryKey,
} from '$application/lib/generated/apcApi';

import { JournalGroupItem } from './JournalsList';
import {
  activeJournalsTabAtom,
  JournalsTabs,
  showAddJournalToGroupAtom,
  showCreateGroupAtom,
} from './store';

interface JournalsModalProps {
  selectedJournals: string[];
  journalGroupsList?: JournalGroupItem[];
}

export const JournalsModals: FC<JournalsModalProps> = ({
  selectedJournals,
  journalGroupsList,
}) => {
  const queryClient = useQueryClient();
  const [showCreateGroup, setShowCreateGroup] = useAtom(showCreateGroupAtom);
  const [showAddJournalToGroup, setShowAddJournalToGroup] = useAtom(
    showAddJournalToGroupAtom,
  );

  const setActiveTab = useUpdateAtom(activeJournalsTabAtom);

  const handleAddJournalToGroup = (result: AddJournalToGroupResponse) => {
    // TODO: we may need to add some snackbar to show response to user
    if (result.addedJournals === -1) {
      console.error(
        '[AddJournalToGroup] Error while Adding Journals to the selected group ...',
      );
    }
    setShowAddJournalToGroup(false);
    queryClient.refetchQueries(getGetJournalGroupsQueryKey(), { active: true });
    queryClient.invalidateQueries(getGetJournalsOfJournalGroupQueryKey(result.groupId));
  };

  const handleCreateGroup = (result: any) => {
    setShowCreateGroup(false);
    setActiveTab(JournalsTabs.Groups);
    queryClient.refetchQueries(getGetJournalGroupsQueryKey(), { active: true });
  };

  return (
    <>
      <CreateGroupModal
        open={showCreateGroup}
        onSubmit={handleCreateGroup}
        selectedJournals={selectedJournals}
        onClose={() => setShowCreateGroup(false)}
        onCancel={() => setShowCreateGroup(false)}
      />
      <AddJournalToGroupModal
        open={showAddJournalToGroup}
        onSubmit={handleAddJournalToGroup}
        selectedJournals={selectedJournals}
        journalGroupsList={journalGroupsList}
        onClose={() => setShowAddJournalToGroup(false)}
        onCancel={() => setShowAddJournalToGroup(false)}
      />
    </>
  );
};

export default JournalsModals;
