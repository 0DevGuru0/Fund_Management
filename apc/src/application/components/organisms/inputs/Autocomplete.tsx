import React, { FC, useRef, useState } from 'react';

import { debounce } from 'debounce';

import { Item } from '$application/components/molecules/etc/Menu';
import Select, { SelectProps } from '$application/components/molecules/inputs/Select';
import { animateMenuItem } from '$application/components/molecules/inputs/Select/animateMenuItem';

import SearchInput from './Autocomplete/SearchInput';

export type AutocompleteProps<
  T extends string | Item = string | Item
> = SelectProps<T> & {
  searchPlaceholder?: string;
  onSelect: (item: T) => void;
  onFilterChange: (value: string) => void;
  className?: string;
};

export const Autocomplete: FC<AutocompleteProps> = (props) => {
  const { onFilterChange } = props;
  const rendererRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChangeSearch = (value: string) => {
    setSearchTerm(value);
    debounce(onFilterChange(value), 500);
  };

  const onSelect = (item: any, itemRef?: HTMLDivElement) => {
    if (itemRef && props.multiSelectable) {
      animateMenuItem(itemRef, () => props.onSelect(item));
    } else {
      props.onSelect(item);
    }
  };

  return (
    <Select
      {...props}
      onSelect={onSelect}
      rendererRef={rendererRef}
      renderInput={() => (
        <SearchInput
          {...props}
          searchTerm={searchTerm}
          rendererRef={rendererRef}
          onChangeSearchTerm={(e) => handleChangeSearch(e.target.value)}
        />
      )}
    />
  );
};

export default Autocomplete;
