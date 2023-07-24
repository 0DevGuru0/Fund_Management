/* eslint-disable no-console */
import React, { FC } from 'react';

import { MoreOptionItem } from '@iin/pubnito-components';
import styled from 'styled-components';

import { MoreOptions } from '$application/components/molecules/etc/MoreOptions';

interface ChannelControlProps {
  channelName: string;
}

export const ChannelControl: FC<ChannelControlProps> = () => {
  const editChannelHandler = () => {
    console.log('Edit Channel Clicked');
  };

  const deleteChannelHandler = () => {
    console.log('Delete Channel Clicked');
  };

  return (
    <StyledMoreOptions position="bottom" variant="vertical" title="More" size="Md">
      <MoreOptionItem
        icon="edit"
        filledIcon="edit"
        title="Edit Channel"
        clickHandler={editChannelHandler}
      />
      <MoreOptionItem
        icon="slash"
        variant="error"
        filledIcon="slash"
        title="Delete Channel"
        clickHandler={deleteChannelHandler}
      />
    </StyledMoreOptions>
  );
};

export default ChannelControl;

const StyledMoreOptions = styled(MoreOptions)`
  margin: 0 auto;
  width: max-content;
  height: max-content;
`;
