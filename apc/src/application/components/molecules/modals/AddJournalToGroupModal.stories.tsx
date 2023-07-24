/* eslint-disable no-console */
import React, { useState } from 'react';

import { StoryFC } from '$application/components/StoryFC';

import {
  AddJournalToGroupModal,
  AddJournalToGroupModalProps,
} from './AddJournalToGroupModal';

export default {
  title: 'Molecules / Modals',
  component: AddJournalToGroupModal,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a47f6ca7e313b72cfbc2',
  },
};

export const AddJournalToGroup: StoryFC<AddJournalToGroupModalProps> = (args) => {
  const [isOpen, setOpen] = useState(true);

  const onCancel = () => {
    setOpen(false);
    args.onCancel();
  };

  return (
    <div>
      <button onClick={() => setOpen(!isOpen)}>clickMe!</button>
      <AddJournalToGroupModal {...args} open={isOpen} onCancel={onCancel} />
    </div>
  );
};

AddJournalToGroup.args = {
  open: false,
  journalGroupsList: [
    {
      title: 'Group1',
      description: '609fc4eb18232d000658278f',
      id: '6a0a4410-c536-4173-9a38-d9e56fwe5bc8',
    },
    {
      title: 'Group2',
      description: '609fc4eb18232d000658290b',
      id: '6a0a4540-c536-4173-9a38-d9e56ffe5bc8',
    },
    {
      title: 'Group3',
      description: '609fc4eb18232d000658232f',
      id: '6a0a4540-c235-4173-9a38-d9e56ffe5bc8',
    },
  ],
  selectedJournals: [],
};
