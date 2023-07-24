import React, { FC, isValidElement } from 'react';

import styled from 'styled-components';

import Tooltip from '$application/components/atoms/etc/Tooltip';

import { ToggleSelectProps } from '../ToggleSelect';

type ShownItemsProps = Pick<ToggleSelectProps, 'items' | 'onSelect' | 'selectedItems'>;

export const ShownItems: FC<ShownItemsProps> = ({ items, onSelect, selectedItems }) => {
  return (
    <Container>
      {items.map((item, key) => (
        <Tooltip key={key} title={item.title} arrow>
          <Circle
            onClick={() => onSelect(item.title)}
            $selected={selectedItems.includes(item.title)}
          >
            {isValidElement(item.innerItem) ? (
              <Icon>{item.innerItem}</Icon>
            ) : (
              <Image src={(item.innerItem as string) ?? './defaultUser.png'} />
            )}
          </Circle>
        </Tooltip>
      ))}
    </Container>
  );
};

export default ShownItems;

const Container = styled.div`
  display: flex;
  cursor: pointer;
`;

interface CircleProps {
  $selected: boolean;
}

const Circle = styled.div<CircleProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[300]};
  :not(:first-child) {
    margin-left: -10px;
  }
  border: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.palette.primary : theme.background.primary};
`;

const Icon = styled.div`
  margin: 6px;
  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }
`;

const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 50%;
`;
