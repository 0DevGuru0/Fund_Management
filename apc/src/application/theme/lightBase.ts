import { Color } from '@material-ui/core';
import { rgba } from 'polished';

import ITheme from './ITheme';

const grey: Partial<Color> = {
  '100': '#fff',
  '200': '#f7fafe',
  '300': '#e3ebf7',
  '400': '#eff3fa',
  '500': '#d5dfed',
  '600': '#c1cddd',
  '700': '#a1b1c7',
  '800': '#738297',
};

export const lightBase: ITheme = {
  name: 'LightBase',
  title: 'Light Theme',
  negative: {
    default: '#f36d53',
    shadow: '#dc553b',
    tint1: '#f6927e',
    tint2: '#f8b5a8',
    tint3: '#fcdad4',
    tint4: '#feedea',
  },
  background: {
    primary: '#fff',
    secondary: '#f7fafe',
    overlay: '#f9f9f9',
  },
  palette: {
    primary: '#1b62f8',
    primaryLight: '#eff3fa',
    primaryWarm: '#e3ecfe',
    primaryDark: '#0a4fde',
    primaryMiddle: '#c7d8fd',
    secondary: '#04bfbf',
    secondaryLight: '#e0f7f7',
    secondaryMiddle: '#1ab297',
    secondaryWarm: '#06a1a1',
    secondaryDark: '#048f9c',
    tertiary: '#e6f7f9',
    brand: '#81dfdf',
    negative: '#f36d53',
    negativeLight: '#feedea',
    negativeWarm: '#dc553b',
    grey,
  },
  text: {
    primary: '#7b818b',
    lowContrast: '#c1cddd',
    hightContrast: '#21242a',
    contrast: {
      primary: '#a1b1c7',
      secondary: '#000',
    },
  },
  heading: '#616173',
  link: {
    text: '#738297',
    hover: '#03b9ff',
    back: '#e0f7ff',
  },
  disabled: {
    item: '#000',
    background: '#000',
  },
  box: {
    background: '#fff',
    highlight: rgba('#e6f7f9', 0.5),
    shadow: '#888888',
  },
  border: '#e3ebf7',
  divider: '#000',
  error: '#FFB19D',
  badge: '#f36d53',
  cmp: {
    historyCard: {
      done: {
        light: '#e2f5f2',
        solid: '#1ab297',
      },
    },
    button: {
      secondary: '#e0f7f7',
      tertiary: '#e3ecfe',
      fourth: '#09b6c7',
    },
    search: {
      shadow: '#c0efef4d',
    },
    table: {
      primary: '#f9f9f9',
      secondary: '#f3f3f3',
      background: '#fff',
    },
    calendar: {
      currentDay: '#f3f3f3',
      badge: '#e94d4d',
    },
    input: {
      main: '#04bfbf',
      lowContrast: '#81dfdf',
      border: '#43cfcf',
    },
    header: {
      secondary: '#e3ebf7',
      alert: '#dc553b',
      border: '#81dfdf',
      negative: '#f36d53',
      logout: '#feedea',
    },
  },
  taskPalette: {
    yellow: '#f5d650',
    green: '#1ab297',
    red: '#f36d53',
    orange: '#febb6e',
    grey: '#738297',
    purple: '#7b45ef',
    blue: '#1b62f8',
  },
  typography: {
    fontFamily: ['Source Sans Pro'],
    fontWeight: 400,
    fontSize: '14px',
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
};
