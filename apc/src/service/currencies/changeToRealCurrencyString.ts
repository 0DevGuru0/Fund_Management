export const changeToRealCurrencyString = (microAmount?: bigint | null): string => {
  if (!microAmount) {
    return '0';
  }
  let microString = microAmount.toString();
  const neededExcessZeros = 7 - microString.length;
  for (let i = 0; i < neededExcessZeros; i++) {
    microString = `0${microString}`;
  }
  const microStringDecimal = `${microString.slice(
    0,
    microString.length - 6,
  )}.${microString.slice(microString.length - 6)}`;
  return microStringDecimal.replace(/(\.0+|0+)$/, '');
};

export const showCurrency = (currency: string): string => {
  let budgetCurrency = currency.toLocaleLowerCase();
  switch (budgetCurrency) {
    case 'usd':
      budgetCurrency = 'US Dollar ($)';
      break;
    case 'gbp':
      budgetCurrency = 'British Pound (£)';
      break;
    case 'eur':
      budgetCurrency = 'Euro (€)';
      break;
  }
  return budgetCurrency;
};
