import React from 'react';

import dayjs from 'dayjs';

import { GetVoucherById200 } from '$application/lib/generated/apcApi.schemas';

import { BlackText, Cell, Label } from './sharedStyled';

interface Props {
  className?: string;
  voucher: GetVoucherById200;
}

export const ManagementVoucherDetailsSidebar = ({ className, voucher }: Props) => {
  return (
    <div className={className}>
      <Cell>
        <Label>Start Date</Label>
        <BlackText bold>
          {dayjs(voucher.createdAt as string).format('DD MMM YYYY')}
        </BlackText>
      </Cell>
      <Cell>
        <Label>Expiry Date</Label>
        <BlackText bold>
          {voucher.expiresAt
            ? dayjs(voucher.expiresAt as string).format('DD MMM YYYY')
            : '-'}
        </BlackText>
      </Cell>
      <Cell>
        <Label>Last Reserved</Label>
        <BlackText bold>
          {voucher.lastReservedAt
            ? dayjs(voucher.lastReservedAt as string).format('DD MMM YYYY')
            : '-'}
        </BlackText>
      </Cell>
    </div>
  );
};

export default ManagementVoucherDetailsSidebar;
