import React, { FC } from 'react';

import { JournalItemType } from './journalsTable.config';
import JournalsTableNonSelectable from './JournalsTableNonSelectable';
import JournalsTableSelectable from './JournalsTableSelectable';

export interface JournalsTableProps {
  selectableRows?: boolean;
  tableItems: JournalItemType[];
}

const JournalsTable: FC<JournalsTableProps> = ({
  tableItems,
  selectableRows = false,
}) => {
  const Component = selectableRows ? JournalsTableSelectable : JournalsTableNonSelectable;
  return <Component tableItems={tableItems} />;
};

export default JournalsTable;
