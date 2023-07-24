import React, { useState } from 'react';

import { isString } from 'lodash';

import { Item } from '$application/components/molecules/etc/Menu';
import { StoryFC } from '$application/components/StoryFC';

import { Autocomplete, AutocompleteProps } from './Autocomplete';

export default {
  title: 'Organisms / Autocomplete',
  component: Autocomplete,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
  },
};

export const Default: StoryFC<AutocompleteProps> = (args) => {
  const [items, setItems] = useState(args.items);
  const [selectedItems, setSelectedItem] = useState(args.selectedItems);

  const handleSelectOption = (item: string | Item) => {
    args.onSelect?.(item);

    if (!args.multiSelectable) {
      return setSelectedItem([item as string]);
    }

    const updatedList = selectedItems.includes(item)
      ? selectedItems.filter((element) =>
          isString(item)
            ? element !== item
            : !isString(element) && element.id !== item.id,
        )
      : [...selectedItems, item];

    setSelectedItem(updatedList);
  };

  const handleFilterChange = (value: string) => {
    const filteredItems = args.items.filter((element) => {
      const item = isString(element) ? element : element.label;
      return !!item.toLocaleLowerCase().match(value.toLocaleLowerCase());
    });
    setItems(filteredItems);
  };

  return (
    <Autocomplete
      {...args}
      items={items}
      selectedItems={selectedItems}
      onSelect={handleSelectOption}
      onFilterChange={handleFilterChange}
    />
  );
};

const items: Item[] = [
  { id: 'Recent', label: 'Recent' },
  { id: 'Resolved', label: 'Resolved' },
  { id: 'Title', label: 'Title' },
  { id: 'Task Status', label: 'Task Status' },
];

Default.args = {
  items,
  label: 'Default',
  selectedItems: [],
  searchPlaceholder: 'Search something ...',
};

export const MultiSelect = Default.bind({});

MultiSelect.args = {
  items,
  label: 'MultiSelect',
  multiSelectable: true,
  selectedItems: [],
  searchPlaceholder: 'Search something ...',
};
