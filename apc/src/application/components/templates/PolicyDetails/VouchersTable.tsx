import React, { FC, useContext } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { Table } from '$application/components/organisms/tables/Table';
import Pagination from '$application/components/organisms/tables/Table/Pagination';
import { tasksConfig } from '$service/tasks/config';

import {
  VoucherDetailItemType,
  vouchersPerPage,
  voucherTableDefinitions,
} from './config';
import EmptyTable from './EmptyTable';
import { PolicyDetailsContext } from './PolicyDetailsContext';
import VoucherTableControl from './VoucherTableControl';

export interface PoliciesTableProps {
  tableItems: VoucherDetailItemType[];
  isLoading: boolean;
  hasError: boolean;
  count?: number;
}

const VouchersTable: FC<PoliciesTableProps> = ({
  tableItems,
  isLoading,
  hasError,
  count = 0,
}) => {
  const { currentVoucherPageAtom, voucherFilterOptionsAtom, onVoucherClick } = useContext(
    PolicyDetailsContext,
  );
  const filterOptions = useAtomValue(voucherFilterOptionsAtom);
  const [currentPage, setCurrentPage] = useAtom(currentVoucherPageAtom);

  tableItems.forEach((item, index) => {
    item.code = {
      ...item.code,
      index,
    };
  });

  return (
    <Container>
      <VoucherTableControl />
      <LoadingData loading={isLoading && !!filterOptions} error={hasError}>
        {() =>
          isEmpty(tableItems) ? (
            <EmptyTable />
          ) : (
            <Table
              items={tableItems}
              definitions={voucherTableDefinitions}
              onRowClick={(rowIndex) => onVoucherClick?.(tableItems[rowIndex].code.id)}
            />
          )
        }
      </LoadingData>
      {count > vouchersPerPage && (
        <Pagination
          customStyle={PaginationWrapperStyle}
          totalCount={count}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={tasksConfig.inboxPageSize}
        />
      )}
    </Container>
  );
};

const PaginationWrapperStyle = css`
  margin-top: 24px;
  float: right;
`;

const Container = styled.div`
  flex: 1;
`;

export default VouchersTable;
