import React, { FC, ReactNode } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

import MoreItems from './ToggleSelect/MoreItems';
import ShownItems from './ToggleSelect/ShownItems';

export interface ToggleItem {
  title: string;
  innerItem?: ReactNode | string;
}

export interface ToggleSelectProps {
  threshold?: number;
  className?: string;
  items: ToggleItem[];
  selectedItems: string[];
  onSelect: (id: string) => void;
}

export const ToggleSelect: FC<ToggleSelectProps> = ({
  items,
  threshold = 5,
  ...props
}) => {
  const remainingCount = items.length - threshold;
  const shownItems = remainingCount > 0 ? items.slice(0, threshold) : items;
  const hiddenItems = remainingCount > 0 ? items.slice(threshold, items.length) : [];

  return (
    <Container className={clsx('ToggleSelect', props.className)}>
      <ShownItems items={shownItems} {...props} />
      {remainingCount > 0 && <MoreItems items={hiddenItems} {...props} />}
    </Container>
  );
};

export default ToggleSelect;

const Container = styled.div`
  display: flex;
`;
