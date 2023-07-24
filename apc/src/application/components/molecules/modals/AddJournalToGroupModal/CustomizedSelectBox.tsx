import React, { FC, useState } from 'react';

import { useAtom } from 'jotai';
import { filter } from 'lodash';
import { css } from 'styled-components';

import { Item } from '$application/components/molecules/etc/Menu';
import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { JournalGroupItem } from '$application/components/pages/Journals/JournalsList';

import { selectedGroupAtom } from './store';

interface CustomizedSelectBoxProps {
  journalGroupsList?: JournalGroupItem[];
}

export const CustomizedSelectBox: FC<CustomizedSelectBoxProps> = ({
  journalGroupsList,
}) => {
  const mappedItems: Item[] = journalGroupsList
    ? journalGroupsList.map((group) => {
        return { id: group.id, label: group.title, details: group.description };
      })
    : [];

  const [selectedGroup, setSelectedGroup] = useAtom(selectedGroupAtom);
  const [filteredItems, setFilteredItems] = useState<Item[]>(mappedItems);

  const onFilterChange = (value: string) => {
    const updatedList = filter(mappedItems, (item) =>
      item.label.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
    setFilteredItems(updatedList);
  };

  const handleSelectOption = (item: Item | string) => {
    const selectedItem = typeof item === 'string' ? item : item.id;
    const existedItem = selectedGroup && selectedGroup.id === selectedItem;
    // TODO: currently API supports only one groupId
    setSelectedGroup(existedItem ? undefined : (item as Item));
  };

  return (
    <Autocomplete
      label="Group Name"
      items={filteredItems}
      customStyle={selectBoxStyle}
      onSelect={handleSelectOption}
      onFilterChange={onFilterChange}
      selectedItems={selectedGroup ? [selectedGroup] : []}
    />
  );
};

export default CustomizedSelectBox;

const selectBoxStyle = css`
  margin-top: 36px;
`;
