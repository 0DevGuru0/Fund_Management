/* eslint-disable no-console */
import React, { FC } from 'react';

import { MoreOptionItem } from '@iin/pubnito-components';
import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';

import { MoreOptions } from '$application/components/molecules/etc/MoreOptions';
import { ItemState } from '$application/components/organisms/tables/Table/CornerColumn/ItemState';
import { taskToColor } from '$application/lib/taskToColor';

import { messageTemplateWizard } from '../store';

interface MessageStateProps {
  label: keyof typeof taskToColor;
  id: string;
  isHovered: boolean;
}

export const MessageState: FC<MessageStateProps> = ({ label, isHovered, id }) => {
  const setWizardStatus = useUpdateAtom(messageTemplateWizard);

  return (
    <Wrapper>
      <ItemState label={label} />
      {isHovered && (
        <StyledMoreOptions position="bottom" variant="vertical" title="More" size="Sm">
          <MoreOptionItem
            icon="edit-3"
            filledIcon="edit-3-fill"
            title="Edit"
            clickHandler={(e) => {
              e.stopPropagation();
              setWizardStatus({
                openWizard: true,
                openDeleteModal: false,
                messageId: id,
              });
            }}
          />
          <MoreOptionItem
            icon="trash"
            filledIcon="trash-2-fill"
            title="Delete"
            variant="error"
            clickHandler={(e) => {
              e.stopPropagation();
              setWizardStatus({
                openWizard: false,
                openDeleteModal: true,
                messageId: id,
              });
            }}
          />
        </StyledMoreOptions>
      )}
    </Wrapper>
  );
};

export default MessageState;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const StyledMoreOptions = styled(MoreOptions)`
  margin: 0 auto;
  margin-left: 23px;
  width: max-content;
  height: max-content;
`;
