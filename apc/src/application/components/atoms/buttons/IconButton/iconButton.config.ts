import { rgba } from 'polished';

import { getThemes } from '$application/theme/getThemes';

const theme = getThemes().LightBase;

export interface SectionColor {
  icon: string;
  container?: string;
}

export type ObjectRecord = Record<string, string | SectionColor>;
export type ConfigType = Record<string, string | ObjectRecord>;

export interface IconButtonConfig {
  free: ConfigType;
  withText: ConfigType;
  contained: ConfigType;
}

export const iconButtonConfig: IconButtonConfig = {
  withText: {
    default: { normal: theme.palette.grey['700']! },
    disabled: theme.palette.grey['500']!,
    hovered: {
      normal: theme.text.contrast.secondary,
      primary: theme.palette.primary,
      secondary: theme.palette.secondary,
      negative: theme.palette.negative,
    },
    pressed: {
      normal: rgba(theme.palette.grey['500']!, 0.6),
      primary: rgba(theme.palette.grey['500']!, 0.6),
      secondary: rgba(theme.palette.grey['500']!, 0.6),
      negative: rgba(theme.palette.grey['500']!, 0.6),
    },
  },
  free: {
    default: { normal: theme.palette.grey['700']!, other: theme.palette.grey['600']! },
    disabled: theme.palette.grey['500']!,
    hovered: {
      normal: theme.palette.grey['800']!,
      primary: theme.palette.primary,
      secondary: theme.palette.secondary,
      negative: theme.cmp.header.negative,
      other: theme.palette.grey['800']!,
    },
    pressed: {
      normal: rgba(theme.palette.grey['800']!, 0.2),
      primary: rgba(theme.palette.primary, 0.2),
      secondary: rgba(theme.palette.secondary, 0.2),
      negative: rgba(theme.cmp.header.negative, 0.2),
      other: rgba(theme.text.contrast.secondary, 0.2),
    },
  },
  contained: {
    default: {
      normal: {
        icon: theme.palette.grey['700']!,
        container: theme.palette.grey['200']!,
      },
      primary: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.primary,
      },
      secondary: {
        icon: theme.palette.secondary,
        container: theme.cmp.button.secondary,
      },
      negative: {
        icon: theme.palette.negative,
        container: theme.palette.negativeLight,
      },
      tertiary: {
        icon: theme.palette.primary,
        container: theme.palette.primaryWarm,
      },
      fourth: {
        icon: theme.palette.grey['100']!,
        container: theme.cmp.button.fourth,
      },
    },
    hovered: {
      normal: {
        icon: theme.palette.grey['800']!,
        container: theme.palette.grey['400']!,
      },
      primary: {
        icon: theme.palette.grey['100']!,
        container: rgba(theme.palette.primary, 0.5),
      },
      secondary: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.secondary,
      },
      negative: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.negative,
      },
      tertiary: {
        icon: theme.palette.grey['100']!,
        container: rgba(theme.palette.primary, 0.5),
      },
      fourth: {
        icon: theme.palette.grey['100']!,
        container: rgba(theme.palette.secondary, 0.8),
      },
      primaryTool: {
        icon: theme.palette.primary,
        container: theme.palette.primaryWarm,
      },
      secondaryTool: {
        icon: theme.palette.secondary,
        container: theme.palette.secondaryLight,
      },
      negativeTool: {
        icon: theme.palette.negative,
        container: theme.palette.negativeLight,
      },
    },
    pressed: {
      normal: {
        icon: theme.palette.grey['800']!,
        container: theme.palette.grey['200']!,
      },
      primary: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.primaryDark,
      },
      secondary: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.secondaryWarm,
      },
      negative: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.negative,
      },
      tertiary: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.primary,
      },
      fourth: {
        icon: theme.palette.grey['100']!,
        container: theme.palette.secondaryDark,
      },
    },
  },
};

export default iconButtonConfig;
