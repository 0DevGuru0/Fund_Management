/* eslint-disable no-console */
import React, { FC, useContext, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { isEmpty, values } from 'lodash';
import styled, { css } from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';
import { Table } from '$application/components/organisms/tables/Table';
import Pagination from '$application/components/organisms/tables/Table/Pagination';

import { JournalItemType, journalsTableDefinitions } from './journalsTable.config';
import { JournalsContextSelectable } from './JournalsTableContext';
import { journalsFiltersConfig } from './JournalsTableControl/journalsFiltersConfig';
import JournalsTableControlSelectable from './JournalsTableControlSelectable';

export interface JournalsTableSelectableProps {
  tableItems: JournalItemType[];
}

const JournalsTableSelectable: FC<JournalsTableSelectableProps> = ({ tableItems }) => {
  const {
    hasError,
    isLoading,
    totalItems,
    selectAllAtom,
    pageSize = 10,
    currentPageAtom,
    selectedRowsAtom,
  } = useContext(JournalsContextSelectable);

  const setSelectAll = useUpdateAtom(selectAllAtom);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const selectedRowsCount = values(selectedRows).filter(Boolean).length;

  const handleSelectedRow = (isNew: boolean, journalId: string) => {
    setSelectedRows({ ...selectedRows, [journalId]: isNew });
  };

  tableItems.forEach((item, index: number) => {
    item.title = {
      ...item.title,
      index: pageSize * (currentPage - 1) + index,
      isChecked: selectedRows[item.title.id],
      onToggle(newState: boolean, journalId: string) {
        handleSelectedRow(newState, journalId);
      },
    };
  });

  // If the number of selected rows and table rows were not equal, uncheck the Checkbox
  useEffect(() => {
    setSelectAll(selectedRowsCount === tableItems.length);
  }, [tableItems.length, selectedRows, setSelectAll, selectedRowsCount]);

  return (
    <>
      <JournalsTableControlSelectable
        tableItems={tableItems}
        config={journalsFiltersConfig}
        showSelectAll={selectedRowsCount > 0}
      />
      {isEmpty(tableItems) ? (
        <EmptyContentHolder
          title="No Results Found"
          icon={<NoSearchResult src="/nothingToCompare.png" />}
          description="Try changing filters or the search term."
        />
      ) : (
        <LoadingData loading={isLoading} error={hasError}>
          {() => (
            <>
              <Table
                items={tableItems}
                definitions={journalsTableDefinitions}
                // onRowClick={(id) => console.log(tableItems[id])}
              />
              {totalItems > pageSize && (
                <Pagination
                  pageSize={pageSize}
                  totalCount={totalItems}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  customStyle={PaginationWrapperStyle}
                />
              )}
            </>
          )}
        </LoadingData>
      )}
    </>
  );
};

export default JournalsTableSelectable;

const NoSearchResult = styled.img`
  width: 465px;
  height: 200px;
  margin-bottom: 12px;
`;

const PaginationWrapperStyle = css`
  margin-top: 24px;
  float: right;
`;
