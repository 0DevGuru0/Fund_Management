import '@material-ui/core/styles/createMuiTheme';

interface ActionStyle {
  boxShadow?: string;
  background?: string;
  border?: string;
  title?: string;
}

interface Style {
  default: {
    title?: string;
    background?: {
      default?: string;
      focused?: string;
    };
    border?: {
      default?: string;
      focused?: string;
    };
    boxShadow?: {
      firstColor?: string;
      secondColor?: string;
    };
  };
  hover?: ActionStyle;
  active?: ActionStyle;
  focus?: ActionStyle;
  disabled?: ActionStyle;
}

interface ButtonStyle {
  contained?: Style;
  outlined?: Style;
}

interface ComponentsOptions {
  pagination: {
    root: {
      background: string;
    };
    btnRoot: {
      hovered: {
        background: string;
      };
    };
  };

  pageCountBox: {
    buttonRoot: {
      default: {
        background: string;
      };
      hovered: {
        background: string;
      };
      after: {
        background: {
          current: string;
          other: string;
        };
      };
    };
  };

  moreOptions: {
    root: {
      background: {
        default: string;
        error: string;
        primary: string;
        hover: string;
      };
    };
    iconFill: {
      error: string;
      highContrast: string;
      primary: string;
      default: string;
    };
    text: {
      error: string;
      primary: string;
    };
  };

  button: {
    default: ButtonStyle;
    primary: ButtonStyle;
    secondary: ButtonStyle;
    icon: {
      color?: string;
    };
  };
}

declare module '@material-ui/core/styles/createMuiTheme' {
  export interface ThemeOptions {
    cmp?: ComponentsOptions;
  }

  export interface Theme {
    cmp?: ComponentsOptions;
  }
}
