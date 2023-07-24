import React, { FC, useContext } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty } from 'lodash';
import { css } from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { Table } from '$application/components/organisms/tables/Table';
import Pagination from '$application/components/organisms/tables/Table/Pagination';
import { tasksConfig } from '$service/tasks/config';

import { policiesPerPage, PolicyItemType, policyTableDefinitions } from './config';
import EmptyTable from './EmptyTable';
import { PoliciesContext } from './PoliciesContext';
import PoliciesTableControl from './PoliciesTableControl';

export interface PoliciesTableProps {
  tableItems: PolicyItemType[];
  isLoading: boolean;
  hasError: boolean;
  count?: number;
}

const PoliciesTable: FC<PoliciesTableProps> = ({
  tableItems,
  isLoading,
  hasError,
  count = 0,
}) => {
  const { filterOptionsAtom, currentPageAtom, onPolicyTableRowClick } = useContext(
    PoliciesContext,
  );

  const filterOptions = useAtomValue(filterOptionsAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  tableItems.forEach((item, index: number) => {
    item.title = {
      ...item.title,
      index: (currentPage - 1) * policiesPerPage + index,
    };
  });

  return (
    <>
      <PoliciesTableControl />
      <LoadingData loading={isLoading && !!filterOptions} error={hasError}>
        {() =>
          isEmpty(tableItems) ? (
            <EmptyTable />
          ) : (
            <Table
              items={tableItems}
              definitions={policyTableDefinitions}
              onRowClick={(index) => {
                const policyId = tableItems?.[index]?.title?.id;
                if (policyId) onPolicyTableRowClick(policyId);
              }}
            />
          )
        }
      </LoadingData>
      {!isEmpty(tableItems) && count > policiesPerPage && (
        <Pagination
          customStyle={PaginationWrapperStyle}
          totalCount={count}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={tasksConfig.inboxPageSize}
        />
      )}
    </>
  );
};

const PaginationWrapperStyle = css`
  margin-top: 24px;
  float: right;
`;

export default PoliciesTable;
