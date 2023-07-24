import React, { FC } from 'react';

import { MoreOptionItem } from '@iin/pubnito-components';

import { IconSize } from '$application/components/atoms/buttons/IconButton/sizeUtils';
import { MoreOptions } from '$application/components/molecules/etc/MoreOptions';

export interface ITaskOptions {
  title: string;
  icon: string;
  filledIcon: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'default' | 'black' | 'error';
}

interface Props {
  title: string;
  variant: 'vertical' | 'horizontal';
  size: IconSize;
  taskOptions: ITaskOptions[];
}

export const TaskOptions: FC<Props> = ({ taskOptions, ...props }) => (
  <MoreOptions {...props}>
    {taskOptions.map((option, key) => (
      <MoreOptionItem {...option} key={key} />
    ))}
  </MoreOptions>
);

export default TaskOptions;
