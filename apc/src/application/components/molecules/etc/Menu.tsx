import React, { RefObject, useState } from 'react';

import { isEmpty, isNil } from 'lodash';
import styled from 'styled-components';

import CheckSVG from '$application/assets/icons/check.svg';
import { Checkbox } from '$application/components/atoms/inputs/CheckBox';

export interface Item {
  id: string;
  label: string;
  details?: string;
}

export interface MenuProps<T extends string | Item = string | Item> {
  items: T[];
  selectedItems: T[];
  className?: string;
  emptyTitle?: string;
  fullWidth?: boolean;
  size: 'Small' | 'Big';
  isMultiSelectable?: boolean;
  onSelect: (itemLabel: T) => void;
  menuRef?: RefObject<HTMLInputElement>;
  menuItemsRef?: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

export const Menu = <T extends string | Item = string | Item>(props: MenuProps<T>) => {
  const [hovered, setHovered] = useState(-1);
  const { isMultiSelectable = false } = props;

  return (
    <Container
      size={props.size}
      ref={props.menuRef}
      fullWidth={props.fullWidth}
      className={props.className}
    >
      {!isEmpty(props.items)
        ? props.items.map((i, key) => {
            const item: Item = typeof i === 'string' ? { label: i, id: i } : i;
            const existedItems = props.selectedItems.find((_selectedItem) =>
              typeof _selectedItem === 'string'
                ? item.id === _selectedItem
                : _selectedItem.id === item.id,
            );
            const isSelected = !!existedItems;
            const text = typeof item === 'string' ? item : item.label;
            return (
              <MenuItem
                key={item.id}
                ref={(element) => {
                  if (props.menuItemsRef) {
                    props.menuItemsRef.current[i.toString()] = element;
                  }
                }}
                size={props.size}
                selected={isSelected}
                onClick={() => props.onSelect(i)}
                onMouseOut={() => setHovered(-1)}
                onMouseOver={() => setHovered(key)}
              >
                {!isMultiSelectable ? (
                  <>
                    <Text text={text}>{text}</Text>
                    {isSelected && <CheckIcon />}
                  </>
                ) : (
                  <>
                    <Checkbox
                      id={`item-${key}`}
                      isHovered={hovered === key}
                      isChecked={isSelected}
                      onChange={() => props.onSelect(i)}
                    />
                    {isNil(item.details) ? (
                      <Text text={text}>{text}</Text>
                    ) : (
                      <ItemContainer>
                        <Text text={item.label}>{item.label}</Text>
                        <SubText>{item.details}</SubText>
                      </ItemContainer>
                    )}
                  </>
                )}
              </MenuItem>
            );
          })
        : props.emptyTitle && (
            <EmptyText text={props.emptyTitle}>{props.emptyTitle}</EmptyText>
          )}
    </Container>
  );
};

interface SelectProps {
  selected: boolean;
  size: 'Small' | 'Big';
}

interface ContainerProps {
  selected?: boolean;
  fullWidth?: boolean;
  size: 'Small' | 'Big';
}

const Container = styled.div<ContainerProps>`
  z-index: 1015;
  overflow: hidden;
  overflow-y: auto;
  position: inherit;
  border-radius: 8px;
  color: ${({ theme }) => theme.box.background};
  box-shadow: 0 6px 20px 0 rgba(193, 205, 221, 0.5);
  background: ${({ theme }) => theme.background.primary};
  margin-top: ${({ size }) => (size === 'Small' ? 6 : 12)}px;
  font-size: ${({ size }) => (size === 'Small' ? 14 : 15)}px;
  min-width: ${({ size }) => (size === 'Small' ? 128 : 261)}px;
  max-height: ${({ size }) => (size === 'Small' ? 158 : 226)}px;
  width: ${({ fullWidth }) => (fullWidth ? 'inherit' : 'max-content')};
  padding: ${({ size }) => (size === 'Small' ? '6px' : '12px')};
`;

interface IText {
  text: string;
}

const Text = styled.div<IText>`
  flex: 1;
  margin: auto 12px auto 0;
  color: ${({ theme }) => theme.text.hightContrast};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* This is to fix bold re-layout */
  &:after {
    display: block;
    content: '${({ text }) => text}';
    height: 0;
    visibility: hidden;
    user-select: none;
    font-weight: 600;
  }
`;

const SubText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const EmptyText = styled(Text)`
  color: ${({ theme }) => theme.palette.grey[700]};
  text-align: center;
`;

const CheckIcon = styled(CheckSVG)`
  height: 20px;
  width: 20px;
  margin: auto 0;
  path,
  use {
    fill: ${({ theme }) => theme.palette.secondary};
  }
`;

const MenuItem = styled.div<SelectProps>`
  display: flex;
  border-radius: 4px;
  color: ${({ theme }) => theme.text.hightContrast};
  padding: ${({ size }) => (size === 'Small' ? 6 : 12)}px;
  height: ${({ size }) => (size === 'Small' ? 18 : 24)}px;
  font-weight: ${({ selected }) => (selected ? 600 : 'initial')};
  &:not(:last-child) {
    margin-bottom: 6px;
  }
  &:hover {
    font-weight: 600;
    background-color: ${({ theme }) => theme.box.highlight};
  }
`;

const ItemContainer = styled.div`
  display: block;
`;
