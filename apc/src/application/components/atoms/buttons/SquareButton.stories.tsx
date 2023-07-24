import React, { useState } from 'react';

import CreditCardSVG from '$application/assets/icons/credit-card-fill.svg';
import { StoryFC } from '$application/components/StoryFC';

import SquareButton, { SquareButtonProps } from './SquareButton';

export default {
  title: 'Atoms / Buttons / SquareButton',
  component: SquareButton,
};

export const Sample: StoryFC<Omit<SquareButtonProps, 'handleClick' | 'isSelected'>> = (
  args,
) => {
  const [isSelected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(true);
  };
  return <SquareButton {...args} isSelected={isSelected} handleClick={handleClick} />;
};

Sample.args = {
  label: 'Invoice',
  icon: <CreditCardSVG />,
};

const zeplinLink =
  'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e3e886aee93be4798c3';

Sample.parameters = {
  zeplinLink,
};
