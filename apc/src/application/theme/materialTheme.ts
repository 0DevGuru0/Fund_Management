import { Color, ThemeOptions } from '@material-ui/core';
import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';

const grey = {
  '100': '#ffff',
  '200': '#f7fafe',
  '300': '#e3ebf7',
  '400': '#eff3fa',
  '500': '#d5dfed',
  '600': '#c1cddd',
  '700': '#a1b1c7',
  '800': '#738297',
  '900': 'rgba(222, 220, 221, 0.5)',
  A100: 'rgba(193, 205, 221, 0.5)',
} as const;

const primary: SimplePaletteColorOptions & Partial<Color> = {
  main: '#1b62f8',
  light: '#558afa',
  contrastText: '#c7d8fd',
  dark: '#0a4fde',
  '100': '#e3ecfe',
  '200': '#c0efef',
  '300': '#8db0fb',
};

const secondary: SimplePaletteColorOptions & Partial<Color> = {
  main: '#04bfbf',
  light: '#43cfcf',
  contrastText: '#04bfbf',
  dark: '#06a1a1',
  '100': '#e0f7f7',
  '200': '#c0efef',
  '300': '#81dfdf',
};

const cmp: ThemeOptions['cmp'] = {
  pagination: {
    root: {
      background: grey[200],
    },
    btnRoot: {
      hovered: {
        background: grey[400],
      },
    },
  },
  pageCountBox: {
    buttonRoot: {
      default: {
        background: 'transparent',
      },
      hovered: {
        background: '#d6d6d84a',
      },
      after: {
        background: {
          current: primary.main,
          other: 'transparent',
        },
      },
    },
  },
  moreOptions: {
    root: {
      background: {
        default: 'transparent',
        error: '#fdeeee',
        primary: '#e3ecfe',
        hover: '#e3ecfe',
      },
    },
    iconFill: {
      error: '#e94d4d',
      primary: '#1b62f8',
      highContrast: '#21242a',
      default: grey[700],
    },
    text: {
      error: '#e94d4d',
      primary: '#1b62f8',
    },
  },
  button: {
    default: {
      contained: {
        default: {
          background: { default: grey[400] },
          title: grey[800],
          border: {
            default: grey[400],
            focused: grey[500],
          },
        },
        hover: {
          background: grey[300],
          border: grey[300],
          boxShadow: grey[900],
        },
        active: {
          background: grey[200],
          border: grey[200],
          title: grey[600],
        },
        disabled: {
          background: grey[400],
          border: grey[400],
          title: grey[800],
        },
      },
      outlined: {
        default: {
          background: { default: grey[100] },
          border: {
            default: grey[100],
            focused: grey[500],
          },
          title: grey[800],
        },
        hover: {
          background: grey[200],
          border: grey[200],
        },
        focus: {
          background: grey[100],
          title: grey[700],
        },
        active: {
          background: grey[200],
          border: grey[200],
          title: grey[600],
        },
        disabled: {
          background: grey[100],
          border: grey[100],
          title: grey[800],
        },
      },
    },
    primary: {
      contained: {
        default: {
          background: { default: primary.main },
          border: { default: primary.main, focused: primary.contrastText },
          title: grey[100],
          boxShadow: {
            firstColor: grey.A100,
            secondColor: grey.A100,
          },
        },
        hover: {
          background: primary.light,
          border: primary.light,
          boxShadow: grey.A100,
        },
        focus: {
          boxShadow: grey.A100,
        },
        active: {
          background: primary.dark,
          border: primary.dark,
          title: grey[100],
        },
        disabled: {
          background: primary.main,
          title: grey[100],
        },
      },
      outlined: {
        default: {
          background: { default: primary[100] },
          border: {
            default: primary[100],
            focused: primary.main,
          },
          title: primary.main,
        },
        hover: {
          background: primary.main,
          title: grey[100],
          border: primary.main,
        },
        active: {
          background: primary.dark,
          border: primary.dark,
          title: grey[100],
        },
        disabled: {
          background: primary[100],
          title: primary.main,
          border: primary[100],
        },
      },
    },
    secondary: {
      contained: {
        default: {
          background: {
            default: secondary[100],
          },
          border: { default: secondary[100], focused: secondary.main },
          title: secondary.main,
        },
        hover: {
          background: secondary.main,
          title: grey[100],
          border: secondary.main,
        },
        active: {
          background: secondary.dark,
          border: secondary.dark,
          title: grey[100],
        },
        focus: {
          background: secondary[100],
          title: secondary.main,
        },
        disabled: {
          background: secondary[100],
          title: secondary.main,
        },
      },
      outlined: {
        default: {
          background: {
            default: secondary.main,
            focused: secondary.main,
          },
          boxShadow: { firstColor: grey.A100 },
          border: {
            default: secondary.main,
            focused: secondary[200],
          },
          title: grey[100],
        },
        hover: {
          border: secondary.light,
          background: secondary.light,
          boxShadow: grey.A100,
        },
        focus: {
          border: secondary.main,
          title: grey[100],
          background: secondary.main,
          boxShadow: grey.A100,
        },
        active: {
          background: secondary.dark,
          border: secondary.dark,
          boxShadow: 'none',
          title: grey[100],
        },
        disabled: {
          background: secondary.main,
          border: secondary.main,
          title: grey[100],
        },
      },
    },
    icon: {
      color: grey[100],
    },
  },
};

export const materialTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Source Sans Pro',
  },
  palette: {
    primary,
    secondary,
    grey,
  },
  cmp,
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textTransform: 'capitalize',
        borderRadius: '8px',
        padding: '8px 24px',
        height: '36px',
        boxShadow: 'none',
      },
      contained: {
        boxShadow: 'none',
      },
      sizeLarge: {
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '1.25rem',
        height: '57px',
        boxShadow: `0 2px 9px 0 ${grey[700]}`,
      },
      containedSecondary: {
        color: grey[100],
      },
    },
  },
};
export default materialTheme;
