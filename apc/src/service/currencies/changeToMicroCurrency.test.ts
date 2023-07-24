import { changeToMicroCurrency } from '$service/currencies/changeToMicroCurrency';

describe('change to micro currency', () => {
  it('should change int to bigint(without int overflow possibility)', async () => {
    const microCurrency = changeToMicroCurrency(123);

    expect(microCurrency).toBe(BigInt(123000000));
  });

  it('should change int to bigint(with int overflow possibility)', async () => {
    const microCurrency = changeToMicroCurrency(Number.MAX_SAFE_INTEGER);

    expect(microCurrency).toBe(BigInt(Number.MAX_SAFE_INTEGER * Math.pow(10, 6)));
  });

  it('should change float to bigint(without excess fractional part)', async () => {
    const microCurrency = changeToMicroCurrency(123.123);

    expect(microCurrency).toBe(BigInt(123123000));
  });

  it('should change float to bigint(with excess fractional part)', async () => {
    const microCurrency = changeToMicroCurrency(123.123123123);

    expect(microCurrency).toBe(BigInt(123123123));
  });
});
