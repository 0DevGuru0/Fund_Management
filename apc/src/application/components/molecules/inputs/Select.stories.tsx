import React, { useState } from 'react';

import { concat, isString } from 'lodash';

import WaffleSvg from '$application/assets/icons/waffle.svg';
import { Item } from '$application/components/molecules/etc/Menu';
import { StoryFC } from '$application/components/StoryFC';

import { Select, SelectProps } from './Select';

export default {
  title: 'Molecules / Select',
  component: Select,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
  },
};

export const Default: StoryFC<SelectProps> = (args) => {
  const hasLazyLoading = args.label === 'With Lazy Loading';
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

  const handleLoadMoreItems = () => {
    setTimeout(() => {
      const newItems: string[] = [];
      for (const item of items.slice(0, 5)) {
        const randomString = (Math.random() + 1).toString(36).substring(7);
        const element = isString(item) ? item : item.label;
        newItems.push(`${element} ${randomString}`);
      }
      setItems(concat(items, newItems));
    }, 500);
  };

  return (
    <Select
      {...args}
      items={items}
      selectedItems={selectedItems}
      onSelect={handleSelectOption}
      onLoadMoreItems={hasLazyLoading ? handleLoadMoreItems : undefined}
    />
  );
};

export const WithIcon = Default.bind({});
export const MultiSelect = Default.bind({});
export const WithDetails = Default.bind({});
export const WithLazyLoading = Default.bind({});

const items = ['Recent', 'Title', 'Task Status', 'Updated', 'Nearness'];

Default.args = {
  items,
  label: 'Default',
  selectedItems: [],
};

WithIcon.args = {
  items,
  selectedItems: [],
  icon: <WaffleSvg />,
};

MultiSelect.args = {
  items,
  selectedItems: [],
  multiSelectable: true,
  label: 'Multi-Selectable',
};

WithDetails.args = {
  selectedItems: [],
  multiSelectable: true,
  label: 'Multi-Selectable',
  items: [
    { id: '0', label: 'Recent', details: 'Details for Item 01' },
    { id: '1', label: 'Title', details: 'Details for Item 02' },
    { id: '2', label: 'Task Status', details: 'Details for Item 03' },
  ],
};

WithLazyLoading.args = {
  items,
  selectedItems: [],
  label: 'With Lazy Loading',
};
