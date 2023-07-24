import { useCallback, useState } from 'react';

import { Direction } from '@material-ui/core';

import { ILocaleContext } from './LocaleContext';

// TODO: we should read data from backend or local-storage
export const useUserLocale = (): ILocaleContext => {
  const [dir, setDirection] = useState<Direction>('ltr');

  const changeDirection = useCallback(
    (direction) => {
      setDirection(direction);
    },
    [setDirection],
  );

  return {
    direction: dir,
    language: 'en',
    changeDirection,
  };
};
