import React, { FC } from 'react';

import styled from 'styled-components';

import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';
import { Item } from '$application/components/molecules/etc/Menu';
import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';

export interface FormItemProps {
  onFilterChange?: (term: string) => void;
  onLoadMore?: () => void;
  onSelect: (items: Item[]) => void;
  label: string;
  placeHolder: string;
  searchPlaceHolder: string;
  items: Item[];
  selectedItems: Item[];
  disabled?: boolean;
}

const FormItem: FC<FormItemProps> = (props) => {
  const {
    label,
    searchPlaceHolder,
    placeHolder,
    items,
    selectedItems,
    onFilterChange,
    onSelect,
    onLoadMore,
    disabled = false,
  } = props;

  const onSelectItem = (item: Item) => {
    const updatedList = selectedItems.includes(item)
      ? selectedItems.filter((element) => element.id !== item.id)
      : [...selectedItems, item];
    onSelect(updatedList);
  };

  return (
    <StyledFormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        multiSelectable
        placeHolder={placeHolder}
        searchPlaceholder={searchPlaceHolder}
        onFilterChange={onFilterChange ? onFilterChange : () => ({})}
        items={items}
        disabled={disabled}
        selectedItems={selectedItems}
        onLoadMoreItems={onLoadMore}
        onSelect={(item) => onSelectItem(item as Item)}
      />
    </StyledFormControl>
  );
};

export default FormItem;

const StyledFormControl = styled(FormControl)`
  min-width: 369px !important;
`;
