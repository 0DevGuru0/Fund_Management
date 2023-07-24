import React, { FC } from 'react';

import styled from 'styled-components';

import Tooltip from '$application/components/atoms/etc/Tooltip';

import { ClickableItem } from '../Footer';

export const FooterIconLink: FC<ClickableItem> = ({ href, label, icon }) => {
  return (
    <Link href={href} target="_blank">
      <Tooltip title={label} arrow>
        <IconWrapper>
          <HoveredIcon>{icon?.hover}</HoveredIcon>
          <Icon>{icon?.default}</Icon>
        </IconWrapper>
      </Tooltip>
    </Link>
  );
};

const Link = styled.a`
  margin: auto 0 auto 12px;
  position: relative;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  svg {
    height: 20px;
    width: 20px;
  }
`;

const Icon = styled.div`
  pointer-events: none;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
  }
  ${IconWrapper}:hover & {
    display: none;
  }
`;

const HoveredIcon = styled(Icon)`
  display: none;
  pointer-events: none;
  path,
  use {
    fill: ${({ theme }) => theme.link.hover};
  }
  ${IconWrapper}:hover & {
    display: block;
  }
`;
