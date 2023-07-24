import { Color as NumericColor } from '@material-ui/core';

type Color = string;
type FontFamily = string;

export default interface ITheme {
  name: string;
  title: string;
  negative: {
    default: Color;
    shadow: Color;
    tint1: Color;
    tint2: Color;
    tint3: Color;
    tint4: Color;
  };
  background: {
    primary: Color;
    secondary: Color;
    overlay: Color;
  };
  palette: {
    primary: Color;
    primaryWarm: Color;
    primaryLight: Color;
    primaryDark: Color;
    primaryMiddle: Color;
    secondary: Color;
    secondaryWarm: Color;
    secondaryLight: Color;
    secondaryMiddle: Color;
    secondaryDark: Color;
    tertiary: Color;
    brand: Color;
    negative: Color;
    negativeLight: Color;
    negativeWarm: Color;
    grey: Partial<NumericColor>;
  };
  text: {
    primary: Color;
    lowContrast: Color;
    hightContrast: Color;
    contrast: {
      primary: Color;
      secondary: Color;
    };
  };
  heading: Color;
  link: {
    text: Color;
    hover: Color;
    back: Color;
  };
  disabled: {
    item: Color;
    background: Color;
  };
  box: {
    background: Color;
    highlight: Color;
    shadow: Color;
  };
  divider: Color;
  border: Color;
  error: Color;
  badge: Color;
  cmp: {
    historyCard: {
      done: {
        light: Color;
        solid: Color;
      };
    };
    button: {
      secondary: Color;
      tertiary: Color;
      fourth: Color;
    };
    search: {
      shadow: Color;
    };
    table: {
      primary: Color;
      secondary: Color;
      background: Color;
    };
    calendar: {
      currentDay: Color;
      badge: Color;
    };
    input: {
      main: Color;
      lowContrast: Color;
      border: Color;
    };
    header: {
      secondary: Color;
      alert: Color;
      border: Color;
      negative: Color;
      logout: Color;
    };
  };
  taskPalette: {
    yellow: Color;
    green: Color;
    red: Color;
    orange: Color;
    grey: Color;
    purple: Color;
    blue: Color;
  };
  typography: {
    fontFamily: FontFamily[];
    fontWeight: number;
    fontSize: string;
    fontStyle: string;
    fontDisplay: string;
  };
}
