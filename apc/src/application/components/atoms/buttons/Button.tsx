import React, { FC } from 'react';

import { Icon } from '@iin/pubnito-components';
import { ButtonProps, Button as MuiButton, Typography } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';

import useStyles from './Button/useStyles';

export interface IButton extends ButtonProps {
  title: string;
  rightIcon?: string;
  leftIcon?: string;
  customSize?: 'sm' | 'md' | 'lg' | 'xl';
  focused?: boolean;
  customClasses?: { title?: string };
  hasCircularRadius?: boolean;
  loadingLabel?: string;
  isLoading?: boolean;
}

export const Button: FC<IButton> = (props) => {
  const {
    title,
    customSize = 'md',
    color,
    variant,
    rightIcon,
    leftIcon,
    focused,
    loadingLabel,
    disabled,
    isLoading = false,
    ...rest
  } = props;

  const paddingSize = {
    sm: '8px 12px',
    md: '8px 24px',
    lg: '14px 24px',
    xl: '16px 24px',
  };
  const radiusSize = {
    sm: 8,
    md: 8,
    lg: 8,
    xl: 12,
  };
  const fontSize = {
    sm: '1rem',
    md: '1rem',
    lg: '1rem',
    xl: '1.25rem',
  };
  const iconSize = {
    sm: 20,
    md: 20,
    lg: 20,
    xl: 25,
  };
  const customClass = `${customSize}Class`;
  const classes = useStyles({
    focused,
    customSize,
    padding: paddingSize[customSize],
    radius: radiusSize[customSize],
    font: fontSize[customSize],
    icon: iconSize[customSize],
  });

  const isDisabled = isLoading || disabled;

  return (
    <StyledMuiButton isDisabled={isDisabled} className={rest.className}>
      <MuiButton
        {...rest}
        classes={{
          root: classes.root,
          contained: classes.contained,
          outlined: classes.outlined,
          outlinedPrimary: classes.outlinedPrimary,
          containedPrimary: classes.containedPrimary,
          outlinedSecondary: classes.outlinedSecondary,
          containedSecondary: classes.containedSecondary,
        }}
        className={`${classes[customClass]} ${rest.className ?? ''}`}
        color={color}
        variant={variant}
        disabled={isDisabled}
      >
        {leftIcon && (
          <Icon icon={leftIcon} className={`${classes.icon} ${classes.left}`} />
        )}
        <Typography
          variant="body1"
          component="span"
          className={
            props.customClasses?.title
              ? `${props.customClasses?.title} ${classes.title}`
              : classes.title
          }
        >
          {isLoading ? (
            <LoadingContainer>
              {loadingLabel ?? title}
              <Loading>
                <Dot />
                <Dot />
                <Dot />
              </Loading>
            </LoadingContainer>
          ) : (
            title
          )}
        </Typography>
        {rightIcon && (
          <Icon icon={rightIcon} className={`${classes.icon} ${classes.right}`} />
        )}
      </MuiButton>
    </StyledMuiButton>
  );
};

const StyledMuiButton = styled.div<{ isDisabled?: boolean }>`
  display: inline-block;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      * {
        opacity: 0.8 !important;
      }
    `}
`;

const LoadingAnimation = keyframes`
  0 {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(0, 6px);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(0, -6px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const Loading = styled.div`
  margin-left: 6px;
  & > :nth-child(1) {
    animation: ${LoadingAnimation} 0.75s 0.1s linear infinite;
  }
  & > :nth-child(2) {
    animation: ${LoadingAnimation} 0.75s 0.2s linear infinite;
  }
  & > :nth-child(3) {
    animation: ${LoadingAnimation} 0.75s 0.3s linear infinite;
  }
`;

const Dot = styled.div`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 1 !important;
  background: white;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
