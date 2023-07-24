import React, { useState } from 'react';

import { reject, xor } from 'lodash';

import { StoryFC } from '$application/components/StoryFC';

import { Item, Menu, MenuProps } from './Menu';

export default {
  title: 'Molecules / Menu',
  component: Menu,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac806418edbb04cf1593e5',
  },
};

export const MenuComponent: StoryFC<MenuProps> = (args) => {
  const [selectedItems, setSelectedItems] = useState(args.selectedItems);
  const handleSelect = (item: string | Item) => {
    if (!args.isMultiSelectable) {
      setSelectedItems([item]);
    } else {
      if (typeof item === 'string') {
        setSelectedItems(xor([item], selectedItems));
      } else {
        const existedItem = (selectedItems as Item[]).find((selectedItem) => {
          return selectedItem.id === item.id;
        });
        const updatedList = existedItem
          ? reject(selectedItems, existedItem)
          : [...selectedItems, item];
        setSelectedItems(updatedList);
      }
    }
    args.onSelect(item);
  };
  return <Menu {...args} selectedItems={selectedItems} onSelect={handleSelect} />;
};

const items = ['Item 01', 'Item 02', 'Item 03', 'Item 04'];

MenuComponent.args = {
  items,
  size: 'Small',
  isMultiSelectable: false,
  selectedItems: ['Item 01'],
};

export const MultiSelectMenu: StoryFC<MenuProps> = MenuComponent.bind({});

MultiSelectMenu.args = {
  size: 'Big',
  isMultiSelectable: true,
  selectedItems: ['Item 01'],
  items: [...items, 'Item 05', 'Item 06'],
};

export const MultiDetailedMenu: StoryFC<MenuProps> = MenuComponent.bind({});

MultiDetailedMenu.args = {
  size: 'Big',
  isMultiSelectable: true,
  selectedItems: [{ id: '0', label: 'Item 01', details: 'Description 01' }],
  items: [
    { id: '0', label: 'Item 01', details: 'Description 01' },
    { id: '1', label: 'Item 02', details: 'Description 02' },
  ],
};
