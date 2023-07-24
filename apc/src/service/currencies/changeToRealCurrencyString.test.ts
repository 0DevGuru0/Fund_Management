import { changeToRealCurrencyString } from '$service/currencies/changeToRealCurrencyString';

describe('change to micro currency', () => {
  it('should change bigint to string(without fractional part)', async () => {
    const realCurrency = changeToRealCurrencyString(BigInt(1230000000));

    expect(realCurrency).toBe('1230');
  });

  it('should change bigint to string(with fractional part)', async () => {
    const realCurrency = changeToRealCurrencyString(BigInt(123123020));

    expect(realCurrency).toBe('123.12302');
  });

  it('should change bigint to string(all fractional part)', async () => {
    const realCurrency = changeToRealCurrencyString(BigInt(123020));

    expect(realCurrency).toBe('0.12302');
  });

  it('should change bigint to string(less than fractional part)', async () => {
    const realCurrency = changeToRealCurrencyString(BigInt(1230));

    expect(realCurrency).toBe('0.00123');
  });
});
