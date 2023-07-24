import React, { createRef, FC, useState } from 'react';

import { first, last } from 'lodash';
import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/chevron-right.svg';
import { Options } from '$application/components/atoms/etc/Options';
import Tooltip from '$application/components/atoms/etc/Tooltip';
import { useClickOutside } from '$application/utils';

export interface IHistoryStep {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  className?: string;
  items: IHistoryStep[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ className, items }) => {
  const optionMenuElement = createRef<HTMLDivElement>();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useClickOutside(optionMenuElement, () => setMenuOpen(false));

  const firstItem = first(items);
  const LastItem = last(items);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  return (
    <Container className={className}>
      {items.length > 1 && (
        <>
          <Tooltip
            title={`Go to ${firstItem?.title}`}
            aria-label={`Go to ${firstItem?.title}`}
          >
            <FirstTitle href={firstItem?.href} onClick={firstItem?.onClick}>
              {firstItem?.title}
            </FirstTitle>
          </Tooltip>
          <StyledArrow />
        </>
      )}

      {items.length > 2 && (
        <>
          <StyledMorePages isOpen={isMenuOpen} onClick={toggleMenu}>
            <Tooltip title="View other pages" aria-label="View other pages">
              <span>...</span>
            </Tooltip>
            <div ref={optionMenuElement}>
              <StyledOptionsMenu
                hasChevron
                header="Other pages"
                $isOpen={isMenuOpen}
                actions={items.slice(1, -1).map((el) => ({
                  label: el.title,
                  onClick: el.onClick,
                  href: el.href,
                }))}
              />
            </div>
          </StyledMorePages>
          <StyledArrow />
        </>
      )}
      <LastTitle>{LastItem?.title}</LastTitle>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  align-items: flex-end;
  padding: 19px 0 19px 36px;
`;

const FirstTitle = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text.contrast.primary};
  font-size: 20px;
  line-height: 0.9;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.link.hover};
  }
`;

const LastTitle = styled.div`
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-size: 36px;
  line-height: 0.75;
  font-weight: bold;
  text-transform: capitalize;
`;

const StyledArrow = styled(ArrowSVG)`
  width: 18px;
  height: 18px;
  margin: 0 3px;
  display: block;
  & > path,
  use,
  g {
    fill: ${({ theme }) => theme.palette.grey[700]};
  }
`;

interface StyledMorePagesProps {
  isOpen: boolean;
}

const StyledMorePages = styled.span<StyledMorePagesProps>`
  display: inline-block;
  font-size: 20px;
  line-height: 1.2;
  cursor: pointer;
  color: ${({ theme, isOpen }) => (isOpen ? theme.link.hover : theme.palette.grey[700])};
  &:hover {
    color: ${({ theme }) => theme.link.hover};
  }
`;

interface StyledOptionsMenuProps {
  $isOpen: boolean;
}

const StyledOptionsMenu = styled(Options)<StyledOptionsMenuProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  transform: translate(-45%, 6px);
  padding: 4px 0;
  z-index: 10000;
`;
