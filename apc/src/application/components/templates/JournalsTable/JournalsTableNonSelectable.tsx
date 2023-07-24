import React, { FC, useContext } from 'react';

import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';
import { Table } from '$application/components/organisms/tables/Table';
import Pagination from '$application/components/organisms/tables/Table/Pagination';

import { JournalItemType, journalsTableDefinitions } from './journalsTable.config';
import { JournalsContextNonSelectable } from './JournalsTableContext';
import { journalsFiltersConfig } from './JournalsTableControl/journalsFiltersConfig';
import JournalsTableControlNonSelectable from './JournalsTableControlNonSelectable';

export interface JournalsTableNonSelectableProps {
  tableItems: JournalItemType[];
}

const JournalsTableNonSelectable: FC<JournalsTableNonSelectableProps> = ({
  tableItems,
}) => {
  const { hasError, isLoading, totalItems, pageSize = 10, currentPageAtom } = useContext(
    JournalsContextNonSelectable,
  );

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  tableItems.forEach((item, index: number) => {
    item.title = {
      ...item.title,
      selectable: false,
      index: pageSize * (currentPage - 1) + index,
      onToggle: (newState: boolean, journalId: string) => ({ newState, journalId }),
    };
  });

  return (
    <>
      <JournalsTableControlNonSelectable config={journalsFiltersConfig} />
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
              <Table items={tableItems} definitions={journalsTableDefinitions} />
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

export default JournalsTableNonSelectable;

const NoSearchResult = styled.img`
  width: 465px;
  height: 200px;
  margin-bottom: 12px;
`;

const PaginationWrapperStyle = css`
  float: right;
  margin-top: 24px;
`;
