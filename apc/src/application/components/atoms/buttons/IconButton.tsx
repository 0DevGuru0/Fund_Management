/* eslint-disable max-lines */ // TODO: to be re-structured in IW-333
import React, { forwardRef } from 'react';

import { rgba } from 'polished';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import iconButtonConfig, { ConfigType } from './IconButton/iconButton.config';
import iconButtonColorMapper from './IconButton/iconButtonColorMapper';
import {
  ContainedIconProps,
  ColorVariant,
  FreeIconProps,
  IconWithTextProps,
} from './IconButton/iconButtonTypes';
import {
  IconSize,
  ContainerSize,
  IconSizeMapper,
  containedIconSizeMapper,
} from './IconButton/sizeUtils';

export type IconButtonProps = IconWithTextProps | FreeIconProps | ContainedIconProps;

export const IconButton = forwardRef<HTMLDivElement, IconButtonProps>((props, ref) => {
  const { icon, title, variant, style, color, disabled = false, onClick } = props;
  const { size: containedIconSize = 'Sm' } = props as ContainedIconProps;
  const { isLight = false, size: freeIconSize = 'Sm' } = props as FreeIconProps;

  return (
    <Wrapper onClick={!disabled ? onClick : undefined} $style={style}>
      {variant === 'WithText' ? (
        <WithTextIconButton
          color={color}
          disabled={disabled}
          config={iconButtonConfig.withText}
        >
          {icon}
          <Text>{title}</Text>
        </WithTextIconButton>
      ) : (
        <Container title={title}>
          {variant === 'Contained' ? (
            <ContainedIconButton
              disabled={disabled}
              color={color}
              config={iconButtonConfig.contained}
              size={containedIconSize}
            >
              {icon}
            </ContainedIconButton>
          ) : (
            <FreeIconButton
              disabled={disabled}
              color={color}
              config={iconButtonConfig.free}
              isLight={isLight}
              size={freeIconSize}
            >
              {icon}
            </FreeIconButton>
          )}
        </Container>
      )}
    </Wrapper>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;

interface WrapperProps {
  $style?: FlattenSimpleInterpolation;
}

const Wrapper = styled.div<WrapperProps>`
  ${({ $style }) => $style}
`;

interface ContainerProps {
  disabled: boolean;
  config: ConfigType;
  color: ColorVariant;
}

const WithTextIconButton = styled.div<ContainerProps>`
  display: flex;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  width: max-content;
  ${({ color, disabled, config }) => {
    const { iconColor, hoverColor, pressedColor } = iconButtonColorMapper(config, color);
    return css`
      color: ${disabled ? rgba(iconColor, 0.5) : iconColor};
      > svg {
        width: ${IconSizeMapper.Md}px;
        height: ${IconSizeMapper.Md}px;
        path,
        use {
          fill: ${disabled ? rgba(iconColor, 0.5) : iconColor};
        }
      }
      &:hover {
        color: ${!disabled && hoverColor};
        > svg path,
        use {
          fill: ${!disabled && hoverColor};
        }
      }
      &:active {
        color: ${!disabled && pressedColor};
        > svg path,
        use {
          fill: ${!disabled && pressedColor};
        }
      }
    `;
  }}
`;

const Text = styled.div`
  margin-left: 6px;
`;

const Container = styled.div`
  cursor: pointer;
  width: max-content;
`;

type ContainedIconContainerProps = ContainerProps & {
  size: ContainerSize;
};

const ContainedIconButton = styled.div<ContainedIconContainerProps>`
  line-height: 0;
  ${({ color, config, disabled, size }) => {
    const { borderRadius, svgSize, spacing } = containedIconSizeMapper(size);
    const {
      hoverColor,
      iconColor,
      pressedColor,
      backgroundColor,
      hoverBackgroundColor,
      pressedBackgroundColor,
    } = iconButtonColorMapper(config, color);
    return css`
      padding: ${spacing}px;
      border-radius: ${borderRadius}px;
      background-color: ${disabled ? rgba(backgroundColor, 0.5) : backgroundColor};
      > svg {
        width: ${svgSize}px;
        height: ${svgSize}px;
        path,
        use {
          fill: ${disabled ? rgba(iconColor, 0.5) : iconColor};
        }
      }
      &:hover {
        background-color: ${!disabled && hoverBackgroundColor};
        > svg path,
        use {
          fill: ${!disabled && hoverColor};
        }
      }
      &:active {
        background-color: ${!disabled && pressedBackgroundColor};
        > svg path,
        use {
          fill: ${!disabled && pressedColor};
        }
      }
    `;
  }}
`;

type FreeIconContainerProps = ContainerProps & {
  size: IconSize;
  isLight: boolean;
};

const FreeIconButton = styled.div<FreeIconContainerProps>`
  ${({ color, isLight, disabled, config, size }) => {
    const { iconColor, hoverColor, pressedColor } = iconButtonColorMapper(
      config,
      color,
      isLight,
    );
    return css`
      > svg {
        width: ${IconSizeMapper[size]}px;
        height: ${IconSizeMapper[size]}px;
        path,
        use {
          fill: ${disabled ? rgba(iconColor, 0.5) : iconColor};
        }
      }
      &:hover {
        > svg path,
        use {
          fill: ${!disabled && hoverColor};
        }
      }
      &:active {
        > svg path,
        > svg use {
          fill: ${!disabled && pressedColor};
        }
      }
    `;
  }}
`;
