/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';

import { union, uniq } from 'lodash';

import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { RenderComponent } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { Language } from '$service/doaj/types/Language';

const limit = 10;
// Top languages as SelectBox initializer
const initItems = [
  'English',
  'Arabic',
  'French',
  'German',
  'Persian',
  'Spanish',
  'Italian',
  'Chinese',
  'Russian',
  'Portuguese',
];

export const LanguageFilter: FC<RenderComponent> = ({
  input,
  filterHandler,
  selectedItems,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<string[]>(initItems);

  const onFilterTermChanged = (newTerm: string) => {
    const filtered = Object.keys(Language).filter((item) =>
      item.toLowerCase().includes(newTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  const handleLoadMoreItems = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    if (offset) {
      const newItems = Object.keys(Language).slice(offset, offset + limit);
      setTimeout(() => {
        setFilteredItems(uniq(union(filteredItems, newItems)));
      }, 200);
    }
  }, [offset]);

  return (
    <Autocomplete
      label={input.label}
      items={filteredItems}
      selectedItems={selectedItems}
      multiSelectable={input.multiSelect}
      onFilterChange={onFilterTermChanged}
      placeHolder={`Select ${input.label}`}
      onLoadMoreItems={handleLoadMoreItems}
      searchPlaceholder={`Type to filter ${input.label}`}
      onSelect={(value) => filterHandler({ name: input.name, value }, true)}
    />
  );
};

export default LanguageFilter;
