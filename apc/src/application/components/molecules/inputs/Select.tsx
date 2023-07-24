/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';

import { concat, isString, uniq, xor, xorBy } from 'lodash';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

import { Item, Menu } from '$application/components/molecules/etc/Menu';
import { useScroll } from '$application/lib/hooks/useScroll';
import { useClickOutside } from '$application/utils';
import { isArrayOfString } from '$application/utils/isArrayOfString';

import { InputLabel } from './Select/InputLabel';
import Selector from './Select/Selector';

export interface SelectProps<T extends string | Item = string | Item> {
  items: T[];
  label?: string;
  loading?: boolean;
  icon?: JSX.Element;
  selectedItems: T[];
  disabled?: boolean;
  errorText?: string;
  isOptional?: boolean;
  placeHolder?: string;
  multiSelectable?: boolean;
  onLoadMoreItems?: () => void;
  renderInput?: () => JSX.Element;
  customStyle?: FlattenSimpleInterpolation;
  rendererRef?: RefObject<HTMLInputElement>;
  onSelect: (item: T, itemRef?: HTMLDivElement) => void;
}

export const Select = <T extends string | Item = string | Item>(
  props: SelectProps<T>,
) => {
  const menuRef = useRef<HTMLInputElement>(null);
  const containerRef = createRef<HTMLDivElement>();
  const [showMenu, setShowMenu] = useState(false);

  const menuItemEls = useRef<Record<string, HTMLDivElement | null>>({});
  const isOpen = !props.disabled && showMenu;
  const hasFilterRenderer = !!props.renderInput;
  const isFilled = props.selectedItems.length > 0;
  const selectorText = props.selectedItems
    .map((item) => (isString(item) ? item : item.label))
    .join(', ');

  const sortedItems =
    props.multiSelectable && hasFilterRenderer
      ? concat(
          props.selectedItems,
          isArrayOfString(props.items)
            ? xor(props.items, props.selectedItems)
            : xorBy(props.items, props.selectedItems, 'id'),
        )
      : props.items;

  const { hitThreshold } = useScroll(menuRef ?? null, '80%');

  useClickOutside(containerRef, () => setShowMenu(false));

  const onToggle = () => {
    if (
      !props.disabled &&
      (!props.multiSelectable || !showMenu) &&
      (!hasFilterRenderer || !props.multiSelectable || !showMenu)
    ) {
      setShowMenu(!showMenu);
    }
  };

  const onSelectHandler = (item: any) => {
    props.onSelect(item, menuItemEls.current[item] ?? undefined);
  };

  useEffect(() => {
    setTimeout(() => showMenu && props.rendererRef?.current?.focus(), 500);
  }, [showMenu]);

  useEffect(() => {
    if (hitThreshold) {
      props.onLoadMoreItems?.();
    }
  }, [hitThreshold]);

  return (
    <Container $customStyle={props.customStyle} ref={containerRef} onClick={onToggle}>
      {props.label && <InputLabel {...props} isFilled={isFilled} />}
      <Selector
        {...props}
        isOpen={isOpen}
        isFilled={isFilled}
        isFocused={showMenu}
        hasError={!!props.errorText}
        selectedValue={selectorText}
      />
      {isOpen && (
        <StyledMenu
          size="Big"
          menuRef={menuRef}
          items={uniq(sortedItems)}
          menuItemsRef={menuItemEls}
          onSelect={onSelectHandler}
          selectedItems={props.selectedItems}
          isMultiSelectable={props.multiSelectable}
          emptyTitle={props.renderInput && 'No results found!'}
        />
      )}
      {props.errorText && <Error>{props.errorText}</Error>}
    </Container>
  );
};

export default Select;

interface ContainerProps {
  $customStyle?: FlattenSimpleInterpolation;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  ${({ $customStyle }) => $customStyle}
`;

const Error = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.palette.negative};
`;

const StyledMenu = styled(Menu)`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
`;
