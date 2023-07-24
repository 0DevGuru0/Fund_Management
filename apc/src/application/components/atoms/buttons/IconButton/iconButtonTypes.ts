import { ReactNode } from 'react';

import { FlattenSimpleInterpolation } from 'styled-components';

import { ContainerSize, IconSize } from './sizeUtils';

export type ColorVariant =
  | 'Normal'
  | 'Primary'
  | 'Secondary'
  | 'Negative'
  | 'Tertiary'
  | 'Fourth'
  | 'ToolPrimary'
  | 'ToolSecondary'
  | 'ToolNegative';

interface CommonProps {
  title?: string;
  icon: ReactNode;
  disabled?: boolean;
  style?: FlattenSimpleInterpolation;
  color: ColorVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface IconWithTextProps extends CommonProps {
  variant: 'WithText';
}

export interface FreeIconProps extends CommonProps {
  variant: 'Free';
  size?: IconSize;
  isLight?: boolean;
}

export interface ContainedIconProps extends CommonProps {
  variant: 'Contained';
  size?: ContainerSize;
}
