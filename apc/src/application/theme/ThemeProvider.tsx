import React, { FC, useEffect } from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import {
  createGenerateClassName,
  StylesProvider,
  jssPreset,
  ThemeProvider as MThemeProvider,
} from '@material-ui/styles';
import { create, Jss } from 'jss';
import rtl from 'jss-rtl';
import {
  StyleSheetManager,
  StylisPlugin,
  ThemeProvider as SCThemeProvider,
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

import { LocaleContext } from '$application/lib/locale/LocaleContext';
import { useUserLocale } from '$application/lib/locale/useUserLocale';
import { GlobalStyle } from '$application/theme/GlobalStyle';
import { materialTheme } from '$application/theme/materialTheme';

import { getThemes } from './getThemes';

const themes = getThemes();

const generateClassName = createGenerateClassName();

interface ThemeProviderProps {
  isStoryBook?: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  isStoryBook = false,
  children,
}) => {
  const jss = create({
    plugins: [...jssPreset().plugins, rtl() as any],
    ...(!isStoryBook ? { insertionPoint: 'mui-inject-first' } : {}),
  }) as Jss;

  const currentLocale = useUserLocale();

  useEffect(() => {
    document.dir = currentLocale.direction;
  }, [currentLocale.direction]);

  const stylePlugins: StylisPlugin[] = [];

  if (currentLocale.direction === 'rtl') {
    stylePlugins.push((stylisRTLPlugin as unknown) as StylisPlugin);
  }

  const mTheme = createMuiTheme({
    ...materialTheme,
    direction: currentLocale.direction ?? 'ltr',
  });

  return (
    <StylesProvider
      jss={jss}
      generateClassName={generateClassName}
      injectFirst={isStoryBook}
    >
      <MThemeProvider theme={mTheme}>
        <SCThemeProvider theme={themes.LightBase}>
          <StyleSheetManager stylisPlugins={stylePlugins}>
            <LocaleContext.Provider value={currentLocale}>
              <GlobalStyle />
              {children}
            </LocaleContext.Provider>
          </StyleSheetManager>
        </SCThemeProvider>
      </MThemeProvider>
    </StylesProvider>
  );
};
