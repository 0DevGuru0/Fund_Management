export const changeToMicroCurrency = (amount: number): bigint => {
  return BigInt(Math.floor(amount * Math.pow(10, 6)));
};
