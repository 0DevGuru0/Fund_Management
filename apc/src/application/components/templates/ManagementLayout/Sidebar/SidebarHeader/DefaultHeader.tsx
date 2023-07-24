import React, { FC } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import WaffleSVG from '$application/assets/icons/waffle.svg';
import LogoSVG from '$application/assets/Logo.svg';

import { HeaderConfig } from '../../Sidebar';

type Props = Extract<HeaderConfig, { kind: 'Default' }> & {
  isOpen?: boolean;
  isShowWaffle?: boolean;
  onWaffleClick: () => void;
};

export const DefaultHeader: FC<Props> = ({
  onWaffleClick,
  isOpen,
  isShowWaffle = true,
}) => (
  <HeaderWrapper isOpen={isOpen}>
    {isShowWaffle && <WaffleIcon isOpen={isOpen} onClick={onWaffleClick} />}
    {isOpen && (
      <Link href="/" passHref>
        <a>
          <Logo />
        </a>
      </Link>
    )}
  </HeaderWrapper>
);

export default DefaultHeader;

interface HeaderWrapperProps {
  isOpen?: boolean;
}

const HeaderWrapper = styled.div<HeaderWrapperProps>`
  height: 36px;
  display: flex;
  width: ${({ isOpen }) => !isOpen && '48px'};
`;

const Logo = styled(LogoSVG)`
  width: 111px;
  height: 36px;
  cursor: pointer;
`;

const WaffleIcon = styled(({ theme, isOpen, ...props }) => <WaffleSVG {...props} />)`
  width: 24px;
  cursor: pointer;
  height: 24px;
  margin: ${({ isOpen }) => (isOpen ? 'auto 12px auto 0' : 'auto')};
  path,
  use {
    fill: ${({ theme }) => theme.text.primary};
    &:hover {
      fill: ${({ theme }) => theme.palette.secondary};
    }
  }
`;
