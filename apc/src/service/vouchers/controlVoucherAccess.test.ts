import { controlVoucherAccess } from './controlVoucherAccess';

import { Voucher } from '.prisma/backend-client';

describe('change to micro currency', () => {
  it('should get undefined for undefined', async () => {
    const voucher = controlVoucherAccess({}, undefined);

    expect(voucher).toBeUndefined();
  });

  it('should get undefined for not allocated voucher in researcher', async () => {
    const voucherInput = {
      status: 'AVAILABLE',
    };
    const voucher = controlVoucherAccess({ Researcher: [] }, voucherInput as Voucher);

    expect(voucher).toBeUndefined();
  });

  it('should get the Voucher back for allocated voucher in researcher', async () => {
    const voucherInput = {
      status: 'ALLOCATED',
    };
    const voucher = controlVoucherAccess({ Researcher: [] }, voucherInput as Voucher);

    expect(voucher).not.toBeUndefined();
  });

  it('should get the Voucher back for not allocated voucher in admin', async () => {
    const voucherInput = {
      status: 'AVAILABLE',
    };
    const voucher = controlVoucherAccess({ SystemAdmin: [] }, voucherInput as Voucher);

    expect(voucher).not.toBeUndefined();
  });

  it('should get the Voucher back for allocated voucher in admin', async () => {
    const voucherInput = {
      status: 'ALLOCATED',
    };
    const voucher = controlVoucherAccess({ SystemAdmin: [] }, voucherInput as Voucher);

    expect(voucher).not.toBeUndefined();
  });
});
