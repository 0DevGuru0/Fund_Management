/* eslint-disable no-console */
import React, { FC } from 'react';

import { MoreOptionItem } from '@iin/pubnito-components';
import styled from 'styled-components';

// import { OptionSeparator } from '$application/components/atoms/etc/Options/OptionSeparator';
import { MoreOptions } from '$application/components/molecules/etc/MoreOptions';

interface MessageTemplateControlProps {
  journalId?: string;
  onCreateTemplate: () => void;
}

export const MessageTemplateControl: FC<MessageTemplateControlProps> = ({
  onCreateTemplate,
}) => {
  // const exportHandler = () => {
  //   console.log('Export Clicked');
  // };

  // const suspendAllHandler = () => {
  //   console.log('Suspend All Clicked');
  // };

  return (
    <StyledMoreOptions position="bottom" variant="horizontal" title="More" size="Lg">
      <MoreOptionItem
        icon="plus"
        title="Create Template"
        filledIcon="plus"
        clickHandler={onCreateTemplate}
      />
      {/* <MoreOptionItem
        title="Export"
        icon="xls-file"
        filledIcon="xls-file"
        clickHandler={exportHandler}
      />
      <OptionSeparator label="Management" />
      <MoreOptionItem
        icon="slash"
        variant="error"
        title="Suspend all"
        filledIcon="slash"
        clickHandler={suspendAllHandler}
      /> */}
    </StyledMoreOptions>
  );
};

export default MessageTemplateControl;

const StyledMoreOptions = styled(MoreOptions)`
  margin: 0 auto;
  width: max-content;
  height: max-content;
`;
