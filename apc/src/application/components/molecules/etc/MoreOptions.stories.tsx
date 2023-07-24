import React from 'react';

import { MoreOptionItem } from '@iin/pubnito-components';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { OptionSeparator } from '$application/components/atoms/etc/Options/OptionSeparator';
import { StoryFC } from '$application/components/StoryFC';

import { MoreOptions, MoreOptionsProps } from './MoreOptions';

export default {
  title: 'Molecules / MoreOptions',
  component: MoreOptions,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61065158c6dc8d134a63ab29',
  },
};

export const Horizontal: StoryFC<Omit<MoreOptionsProps, 'handleClick' | 'isSelected'>> = (
  args,
) => (
  <Wrapper>
    <StyledMoreOptions {...args}>
      <MoreOptionItem
        title="Edit"
        icon="edit-2"
        filledIcon="edit-2-fill"
        clickHandler={action('on edit clicked')}
        variant="default"
      />
      <MoreOptionItem
        title="Delete"
        icon="trash-2"
        filledIcon="trash-2-fill"
        clickHandler={action('on delete clicked')}
        variant="error"
      />
      <OptionSeparator label="Management" />
      <MoreOptionItem
        title="View Detail"
        icon="info-cr"
        filledIcon="info-cr-fill"
        clickHandler={action('on detail clicked')}
      />
    </StyledMoreOptions>
  </Wrapper>
);

export const Vertical = Horizontal.bind({});

Horizontal.args = {
  position: 'top',
  variant: 'horizontal',
  title: 'more options',
  size: 'Lg',
};

Vertical.args = {
  variant: 'vertical',
  title: 'more options',
  size: 'Sm',
};

const StyledMoreOptions = styled(MoreOptions)`
  width: max-content;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
