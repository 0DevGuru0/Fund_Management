/* eslint-disable no-console */
import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { rest } from 'msw';

import { StoryFC } from '$application/components/StoryFC';
import { createServerAddress } from '$application/utils/createServerAddress';

import { CreateGroupModal, CreateGroupModalProps } from './CreateGroupModal';

export default {
  title: 'Molecules / Modals ',
  component: CreateGroupModal,
};

export const CreateJournalGroup: StoryFC<CreateGroupModalProps> = (args) => {
  const [isOpen, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const onSubmitModal = (result: any) => {
    action(JSON.stringify(result));
  };

  return (
    <div>
      <button onClick={toggle}>clickMe!</button>
      <CreateGroupModal
        {...args}
        open={isOpen}
        onClose={toggle}
        onSubmit={onSubmitModal}
      />
    </div>
  );
};

CreateJournalGroup.args = {
  open: false,
  onSwitchChecked: (value: boolean) => {
    action(`switch checked: ${value}`);
  },
};

CreateJournalGroup.parameters = {
  msw: [
    rest.post(createServerAddress('journal-groups'), (req, res, ctx) =>
      res(ctx.delay(500), ctx.json(true)),
    ),
  ],
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a48b1e435610b68ef969',
};
