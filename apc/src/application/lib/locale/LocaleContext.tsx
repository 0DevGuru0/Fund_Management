import { createContext } from 'react';

import { Direction } from '@material-ui/core';

export interface ILocaleContext {
  direction: Direction;
  language: string;
  changeDirection: (dir: Direction) => void;
}

export const LocaleContext = createContext<ILocaleContext>({
  direction: 'ltr',
  language: 'en',
  changeDirection: () => {
    throw new Error('Change direction function is not defined');
  },
});
