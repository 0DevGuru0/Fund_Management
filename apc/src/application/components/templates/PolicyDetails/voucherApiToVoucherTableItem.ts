import dayjs from 'dayjs';

import { TextType } from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { GetVouchersOfPolicy200VouchersItem } from '$application/lib/generated/apcApi.schemas';
import { TaskNameNormalizer } from '$application/lib/taskToColor';

import { VoucherDetailItemType } from './config';

interface TitlesMap {
  [id: string]: {
    id: string;
    title: string;
  };
}

const updateDateColumns = ['RESERVED', 'SUSPENDED'];

const voucherApiToVoucherTableItem = (
  data: GetVouchersOfPolicy200VouchersItem[],
  titlesMap: TitlesMap,
): VoucherDetailItemType[] =>
  data.map((voucher) => {
    const startDate = voucher?.createdAt
      ? dayjs(new Date(voucher?.createdAt as string)).format('DD MMM YYYY')
      : 'N/A';

    const expiryDate = voucher?.expiresAt
      ? dayjs(new Date(voucher?.expiresAt as string)).format('DD MMM YYYY')
      : 'N/A';

    const status = voucher?.status ?? 'UNKNOWN';

    const updateDate =
      status in updateDateColumns
        ? dayjs(new Date(voucher?.lastReservedAt as string)).format('DD MMM YYYY')
        : undefined;

    return {
      code: {
        id: voucher?.id ?? 'N/A',
        title: voucher?.code ?? 'N/A',
      },
      startDate: {
        text: startDate,
        textType: TextType.NormalDark,
      },
      expiryDate: {
        text: expiryDate,
        textType: TextType.NormalDark,
      },
      publisher: {
        text: titlesMap?.[voucher?.publisherId ?? '']?.title ?? 'N/A',
        textType: TextType.NormalDark,
      },
      state: {
        label: TaskNameNormalizer?.[status] ?? 'Unknown',
        updateDate,
      },
    };
  });
export default voucherApiToVoucherTableItem;
