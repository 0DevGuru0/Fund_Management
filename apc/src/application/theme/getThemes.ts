import { keyBy } from 'lodash';

import ITheme from './ITheme';
import { lightBase } from './lightBase';

type ThemeNames = 'DarkBase' | 'LightBase';
type Themes = Record<ThemeNames, ITheme>;

export const getThemes = (): Themes => {
  return keyBy([lightBase], 'name') as Themes;
};
