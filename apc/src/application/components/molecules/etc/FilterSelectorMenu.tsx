import React, { FC, useState } from 'react';

import Popover from '@material-ui/core/Popover';
import styled from 'styled-components';

import CloseSVG from '$application/assets/icons/close.svg';
import Input from '$application/components/atoms/etc/Input';
import { LoadingData } from '$application/components/atoms/etc/LoadingData';

import Item, { ItemProps } from './filterSelectorMenu/Item';

export interface FilterSelectorMenuProps {
  multiSelect?: boolean;
  items?: Omit<ItemProps, 'multiSelect'>[];
  onChange?: (selectedItems: ItemProps[]) => void;
  onClose?: (event: any) => void;
  loading?: boolean;
  anchorEl?: Element;
  chooseable?: boolean;
}

const FilterSelectorMenu: FC<FilterSelectorMenuProps> = ({
  multiSelect = false,
  items = [],
  onChange,
  onClose,
  loading = false,
  anchorEl,
  chooseable = true,
}) => {
  const [allItems, setAllItems] = useState<ItemProps[]>([]);

  React.useEffect(() => {
    const itemsWithMultiSelect = items.map((item) => ({
      ...item,
      multiSelect,
    }));
    const itemsWithSort = [...itemsWithMultiSelect].sort(
      ({ selected: x }, { selected: y }) => {
        const interiorCheck = x ? -1 : 1;
        return x === y ? 0 : interiorCheck;
      },
    );
    setAllItems([
      {
        label: 'Unassigned',
        id: '0',
        selected: !items?.some((v) => v.selected),
        multiSelect,
      },
      ...itemsWithSort,
    ]);
  }, [items, multiSelect]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<ItemProps[] | null>();

  const onChangeSearch = (search: string) => {
    setSearchValue(search);
    if (search) {
      const newFilteredItems: ItemProps[] = allItems.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredItems(newFilteredItems);
    } else {
      setFilteredItems(null);
    }
  };

  const onClickItem = (selectedItem: ItemProps) => {
    const newItems: ItemProps[] = allItems.map((item) => {
      if (item.id === selectedItem.id) {
        item.selected = !item.selected;
      } else {
        if (!multiSelect) {
          item.selected = false;
        }
      }
      return item;
    });
    setAllItems(newItems);

    if (onChange) {
      const selectedItems: ItemProps[] = allItems.filter((item) => item.selected);
      onChange(selectedItems);
    }
  };

  const open = Boolean(anchorEl);
  const showingItems = filteredItems ?? allItems;

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <LoadingData
        loading={loading}
        customLoaderWrapper={(Loader) => (
          <Container>
            <Loader />
          </Container>
        )}
      >
        {() => (
          <Container>
            <CloseButton onClick={onClose} />
            {chooseable ? (
              <>
                <Input
                  value={searchValue}
                  placeholder="Search"
                  onChange={onChangeSearch}
                />
                <ItemsContainer>
                  {showingItems.map((item, index) => (
                    <Item
                      key={index}
                      {...item}
                      onClick={onClickItem}
                      multiSelect={multiSelect}
                    />
                  ))}
                </ItemsContainer>
              </>
            ) : (
              <NotFilterableContainer>Unable To Select</NotFilterableContainer>
            )}
          </Container>
        )}
      </LoadingData>
    </Popover>
  );
};

const Container = styled.div`
  width: 220px;
  max-height: 237px;
  padding: 12px;
`;

const NotFilterableContainer = styled.div`
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const ItemsContainer = styled.div`
  margin-top: 12px;
  overflow-y: auto;
  max-height: 189px;
`;

const CloseButton = styled(CloseSVG)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
    &:hover {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

export default FilterSelectorMenu;
