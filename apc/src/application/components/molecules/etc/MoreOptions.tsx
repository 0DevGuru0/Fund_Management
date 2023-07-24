import React, { FC, useState } from 'react';

import { SelectableItemsBox } from '@iin/pubnito-components';
import styled, { css } from 'styled-components';

import MoreHorizontal from '$application/assets/icons/more-horizontal.svg';
import MoreVertical from '$application/assets/icons/more-vertical.svg';
import CrossSVG from '$application/assets/icons/x.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { IconSize } from '$application/components/atoms/buttons/IconButton/sizeUtils';

export interface MoreOptionsProps {
  variant: 'horizontal' | 'vertical';
  title: string;
  size?: IconSize;
  disabled?: boolean;
  position?: 'top' | 'bottom';
  className?: string;
}

export const MoreOptions: FC<MoreOptionsProps> = ({
  variant,
  title,
  size,
  disabled = false,
  className,
  position,
  children,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setOpen(!isOpen);
    }
  };

  const handleClickOutside = () => {
    if (isOpen) {
      setOpen(false);
    }
  };
  const icon = isOpen ? (
    <CrossSVG />
  ) : variant === 'horizontal' ? (
    <MoreHorizontal />
  ) : (
    <MoreVertical />
  );

  return (
    <StyledContainer className={className}>
      <IconButton
        icon={icon}
        variant="Contained"
        color="Normal"
        size={size}
        title={title}
        disabled={disabled}
        onClick={handleClick}
      />
      {isOpen && (
        <Styled
          onClose={handleClickOutside}
          size="large"
          $position={position ?? 'bottom'}
        >
          {children}
        </Styled>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const Styled = styled(({ $position, ...props }) => <SelectableItemsBox {...props} />)`
  ${({ $position }) =>
    $position === 'top' &&
    css`
      transform: translateY(-150%);
    `}
  left: unset;
  right: 5px;
  z-index: 1200;
  width: 150px;
  padding: 6px 6px;
  & > div > button {
    margin: 3px 0 !important;
    &:first-child {
      margin-top: 0 !important;
    }
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
`;
