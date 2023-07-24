import { useContext } from 'react';

import { LocaleContext, ILocaleContext } from './LocaleContext';

export const useLocale = (): ILocaleContext => {
  return useContext(LocaleContext);
};
