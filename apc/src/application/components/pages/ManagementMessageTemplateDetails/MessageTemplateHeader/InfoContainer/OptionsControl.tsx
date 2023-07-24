/* eslint-disable no-console */
import React, { FC } from 'react';

import { MoreOptionItem } from '@iin/pubnito-components';
import styled from 'styled-components';

import OptionSeparator from '$application/components/atoms/etc/Options/OptionSeparator';
import { MoreOptions } from '$application/components/molecules/etc/MoreOptions';

export const OptionsControl: FC = () => {
  const editTemplateHandler = () => {
    console.log('Edit Template Clicked');
  };

  const suspendHandler = () => {
    console.log('Suspend Clicked');
  };

  return (
    <StyledMoreOptions position="bottom" variant="horizontal" title="More" size="Lg">
      <MoreOptionItem
        icon="edit"
        filledIcon="edit"
        title="Edit Template"
        clickHandler={editTemplateHandler}
      />
      <OptionSeparator label="Management" />
      <MoreOptionItem
        icon="slash"
        variant="error"
        title="Suspend all"
        filledIcon="slash"
        clickHandler={suspendHandler}
      />
    </StyledMoreOptions>
  );
};

export default OptionsControl;

const StyledMoreOptions = styled(MoreOptions)`
  margin: 0 auto;
  width: max-content;
  & > div {
    &:last-child {
      top: 60px !important;
    }
  }
`;
