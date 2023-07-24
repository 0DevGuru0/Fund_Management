import React, { FC, useState } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { isEmpty } from 'lodash';
import { css } from 'styled-components';

import { JournalGroupItem } from '$application/components/pages/Journals/JournalsList';
import { selectedRowsAtom } from '$application/components/pages/Journals/JournalsList/store';
import { useAddJournalsToJournalGroup } from '$application/lib/generated/apcApi';

import { ActionButtons } from './AddJournalToGroupModal/ActionButtons';
import CustomizedSelectBox from './AddJournalToGroupModal/CustomizedSelectBox';
import ErrorHint from './AddJournalToGroupModal/ErrorHint';
import { selectedGroupAtom } from './AddJournalToGroupModal/store';
import RegularModal from './RegularModal';

export interface AddJournalToGroupResponse {
  addedJournals: number;
  journalsCount: number;
  groupId: string;
}

export interface AddJournalToGroupModalProps {
  open: boolean;
  className?: string;
  selectedJournals: string[];
  journalGroupsList?: JournalGroupItem[];
  onClose?: () => void;
  onCancel: () => void;
  onSubmit: (response: AddJournalToGroupResponse) => void;
}

export const AddJournalToGroupModal: FC<AddJournalToGroupModalProps> = ({
  open,
  className,
  selectedJournals,
  journalGroupsList,
  onClose,
  onCancel,
  onSubmit,
}) => {
  const selectedGroup = useAtomValue(selectedGroupAtom);
  const addButtonEnabled = !isEmpty(selectedGroup);
  const [buttonLoading, setButtonLoading] = useState(false);
  const addToGroupMutation = useAddJournalsToJournalGroup();
  const setSelectedRows = useUpdateAtom(selectedRowsAtom);

  // TODO: Currently, the API does not provide 'Restricted Publisher' error
  const showError = false;

  const handleSubmitButton = async () => {
    setButtonLoading(true);
    try {
      const result = await addToGroupMutation.mutateAsync({
        journalGroupId: selectedGroup?.id,
        data: {
          journalIds: selectedJournals,
        },
      });
      onSubmit({
        addedJournals: result.additionCount || -1,
        journalsCount: result.journalGroup?.journalsCount || -1,
        groupId: selectedGroup?.id || '',
      });
      setSelectedRows({});
    } catch (error) {
      onSubmit({
        addedJournals: -1,
        journalsCount: -1,
        groupId: '',
      });
    }
    setButtonLoading(false);
  };

  return (
    <RegularModal
      open={open}
      onClose={onClose}
      className={className}
      paperStyle={paperStyle}
      mainTitle="Add to Group"
      actions={() => (
        <ActionButtons
          onCancel={onCancel}
          onSubmit={handleSubmitButton}
          buttonLoading={buttonLoading}
          addButtonEnabled={addButtonEnabled}
        />
      )}
      subTitle="If the publisher is not restricted, you can add journals to an existing group."
    >
      <CustomizedSelectBox journalGroupsList={journalGroupsList} />
      {showError && <ErrorHint />}
    </RegularModal>
  );
};

export default AddJournalToGroupModal;

const paperStyle = css`
  width: 500px;
  padding: 36px;
  box-sizing: border-box;
`;
