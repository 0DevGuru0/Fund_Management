import React, { FC } from 'react';

import { useUpdateAtom } from 'jotai/utils';
import styled, { css } from 'styled-components';

import AddSVG from '$application/assets/icons/plus.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import IconButton from '$application/components/atoms/buttons/IconButton';
import {
  showCreateGroupAtom,
  showAddJournalToGroupAtom,
} from '$application/components/pages/Journals/store';

export interface ButtonsProps {
  groupExists?: boolean;
  showGroupButton: boolean;
}

export const Buttons: FC<ButtonsProps> = ({ groupExists = false, showGroupButton }) => {
  const setShowCreateGroup = useUpdateAtom(showCreateGroupAtom);
  const setShowAddToGroup = useUpdateAtom(showAddJournalToGroupAtom);

  if (groupExists) {
    return (
      <ButtonsContainer>
        <IconButton
          color="Normal"
          icon={<AddSVG />}
          variant="WithText"
          title="Create Group"
          style={CreateGroupIconButton}
          onClick={() => setShowCreateGroup(true)}
        />
        <CustomizedButton
          color="primary"
          rightIcon="arrow-right"
          customSize="lg"
          variant="outlined"
          title="Add to Group"
          onClick={() => setShowAddToGroup(true)}
        />
      </ButtonsContainer>
    );
  } else {
    if (showGroupButton) {
      return (
        <CustomizedButton
          color="primary"
          leftIcon="plus"
          customSize="lg"
          variant="outlined"
          title="Create Group"
          onClick={() => setShowCreateGroup(true)}
        />
      );
    } else {
      return <div />;
    }
  }
};

export default Buttons;

const ButtonsContainer = styled.div`
  display: flex;
`;

const CreateGroupIconButton = css`
  margin: auto 36px auto 0;
`;

const CustomizedButton = styled(Button)`
  height: 48px;
`;
