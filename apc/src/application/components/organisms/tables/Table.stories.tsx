/* eslint-disable no-console */
import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { mockJournalsApiResponse } from '$application/components/organisms/tables/Table/mockJournalApiResponse';
import { StoryFC } from '$application/components/StoryFC';
import { journalApiToJournalTableItem } from '$application/components/templates/JournalsTable/journalApiToJournalTableItem';
import { journalsTableDefinitions } from '$application/components/templates/JournalsTable/journalsTable.config';

import { Table, TableProps } from './Table';

export default {
  title: 'Organisms / Table',
  component: Table,
};

export const TableComponent: StoryFC<
  TableProps<typeof journalsTableDefinitions>
> = () => {
  const [togglers, setTogglers] = useState({});
  const journals = journalApiToJournalTableItem(mockJournalsApiResponse);

  journals.forEach((item, index) => {
    item.title = {
      ...item.title,
      index,
      isChecked: togglers[item.title.id],
      onToggle(newState: boolean, taskKey: string) {
        setTogglers({ ...togglers, [taskKey]: newState });
      },
    };
  });

  return (
    <Table
      onRowClick={(id: number) => action(String(journals[id]))}
      definitions={journalsTableDefinitions}
      items={journals}
    />
  );
};

TableComponent.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2ca6b1a0da6115a8376e3',
};
