import React, { FC, useRef, useState } from 'react';

import styled from 'styled-components';

import { Menu } from '$application/components/molecules/etc/Menu';
import { useClickOutside } from '$application/utils';

import { ToggleSelectProps } from '../ToggleSelect';

type MoreItemsProps = Pick<ToggleSelectProps, 'items' | 'onSelect' | 'selectedItems'>;

export const MoreItems: FC<MoreItemsProps> = ({ items, selectedItems, onSelect }) => {
  const menuRef = useRef<HTMLInputElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  useClickOutside(menuRef, () => setShowMenu(false));

  const menuItems = items.map((item) => {
    return item.title;
  });

  const handleMenuSelect = (index) => {
    onSelect(index);
  };

  return (
    <Container>
      <div onClick={() => setShowMenu(true)}>{`+${items.length} more`}</div>
      {showMenu && (
        <StyledMenu
          size="Small"
          menuRef={menuRef}
          items={menuItems}
          isMultiSelectable
          onSelect={handleMenuSelect}
          selectedItems={selectedItems}
        />
      )}
    </Container>
  );
};

export default MoreItems;

const Container = styled.div`
  display: flex;
  margin: auto 0;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 12px;
  color: ${({ theme }) => theme.palette.grey[600]};
  &:hover {
    color: ${({ theme }) => theme.palette.grey[800]};
  }
`;

const StyledMenu = styled(Menu)`
  top: 50px;
  z-index: 999;
  position: absolute;
`;
