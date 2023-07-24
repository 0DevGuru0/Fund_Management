import React, { FC, useContext, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';
import { Table } from '$application/components/organisms/tables/Table';
import { FilterContext } from '$application/components/organisms/tables/Table/Filter/FilterContext';
import Pagination from '$application/components/organisms/tables/Table/Pagination';
import SelectedRowCard from '$application/components/organisms/tables/Table/SelectedRowCard';

import {
  MessageTemplateItemType,
  messageTemplatesTableDefinitions,
} from './MessageTemplatesTable/config';
import { currentPageAtom, selectedRowsAtom } from './store';

interface TableProps {
  pageSize: number;
  totalCount: number;
  hasError?: boolean;
  isLoading?: boolean;
  tableItems: MessageTemplateItemType[];
}

export const MessageTemplatesTable: FC<TableProps> = ({
  pageSize,
  tableItems,
  totalCount,
  hasError = false,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const filterContext = useContext(FilterContext);
  const isSelectedAll = useAtomValue(filterContext.selectAllCheckedAtom);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  tableItems.forEach((item, index: number) => {
    item.id = {
      ...item.id,
      index: pageSize * (currentPage - 1) + index,
      isChecked: selectedRows.includes(item.id.id),
      onToggle: (newState: boolean, id: string) => {
        const newRowsState = selectedRows.includes(id)
          ? selectedRows.filter((selectedId) => selectedId !== id)
          : [...selectedRows, id];
        setSelectedRows(newRowsState);
      },
    };
  });

  useEffect(() => {
    if (isSelectedAll) {
      const newRowsState: string[] = tableItems.map((tableItem) => tableItem.id.id);
      setSelectedRows(newRowsState);
    } else {
      setSelectedRows([]);
    }
  }, [isSelectedAll]);

  return (
    <>
      {!isLoading && isEmpty(tableItems) ? (
        <EmptyContentHolder
          title="No Results Found"
          icon={<NoSearchResult src="/nothingToCompare.png" />}
          description="Try changing filters or the search term."
        />
      ) : (
        <LoadingData loading={isLoading} error={hasError}>
          {() => (
            <>
              <Table items={tableItems} definitions={messageTemplatesTableDefinitions} />
              {totalCount > pageSize && (
                <Pagination
                  pageSize={pageSize}
                  totalCount={totalCount}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  customStyle={PaginationWrapperStyle}
                />
              )}
              {selectedRows.length > 0 && (
                <SelectedRowCard
                  totalRowsSelected={selectedRows.length}
                  showGroupButton={false}
                />
              )}
            </>
          )}
        </LoadingData>
      )}
    </>
  );
};

export default MessageTemplatesTable;

const NoSearchResult = styled.img`
  width: 465px;
  height: 200px;
  margin-bottom: 12px;
`;

const PaginationWrapperStyle = css`
  float: right;
  margin-top: 24px;
`;
