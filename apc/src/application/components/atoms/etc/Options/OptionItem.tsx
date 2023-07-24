import React, { FC, ReactNode, useState } from 'react';

import { rgba } from 'polished';
import styled, { css } from 'styled-components';

export interface OptionItemProps {
  icon?: {
    default: ReactNode;
    hover?: ReactNode;
  };
  label: string;
  hoverColor?: {
    background: string;
    icon: string;
  };
  onClick?: () => void;
  href?: string;
}

export const OptionItem: FC<OptionItemProps> = ({
  hoverColor,
  icon,
  label,
  onClick,
  href,
}) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setHovered(true);
  };

  const handleMouseOut: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setHovered(false);
  };

  return (
    <ActionRow
      $hoverBackground={hoverColor?.background}
      onClick={onClick}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
      {isHovered ? (
        <HoveredIcon hoverColor={hoverColor?.icon}>{icon?.hover}</HoveredIcon>
      ) : (
        <Icon>{icon?.default}</Icon>
      )}
      <ActionLabel isHovered={isHovered} hoverColor={hoverColor?.icon}>
        {label}
      </ActionLabel>
    </ActionRow>
  );
};

interface ActionRowProps {
  $hoverBackground?: string;
}

const ActionRow = styled.a<ActionRowProps>`
  text-decoration: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 6px;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  & :hover {
    background-color: ${({ $hoverBackground, theme }) =>
      rgba($hoverBackground ?? theme.cmp.button.tertiary, 0.5)};
  }
  & > svg {
    width: 18px;
    height: 18px;
    path,
    use {
      fill: ${({ theme }) => theme.text.primary};
    }
  }
`;

interface ActionLabelProps {
  hoverColor?: string;
  isHovered: boolean;
}

const ActionLabel = styled.div<ActionLabelProps>`
  padding: 0 6px;
  font-size: 14px;
  flex-grow: 1;
  pointer-events: none;
  color: ${({ theme, isHovered, hoverColor }) =>
    isHovered ? hoverColor ?? theme.palette.primary : theme.text.contrast.secondary};
`;

const svgConfig = css`
  pointer-events: none;
  svg {
    display: block;
    height: 18px;
    width: 18px;
  }
`;

const Icon = styled.div`
  ${svgConfig}
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
  }
`;

interface HoveredIconProps {
  hoverColor?: string;
}
const HoveredIcon = styled(Icon)<HoveredIconProps>`
  ${svgConfig}
  path,
  use {
    fill: ${({ hoverColor, theme }) => hoverColor ?? theme.palette.primary};
  }
`;
