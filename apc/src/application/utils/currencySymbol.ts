import { Currency } from '$service/doaj/types/Currency';

export const currencySymbol = (abbreviateName: string): string => {
  const searchTerm = Object.keys(Currency).find(
    (key) => Currency[key] === abbreviateName,
  );

  switch (searchTerm) {
    case 'IRR':
      return 'IRR';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'JPY':
      return '¥';
    case 'CHF':
      return 'Fr.';
    case 'EGP':
      return 'ج.م';
    case 'RUB':
      return '₽';
    default:
      return '$';
  }
};
