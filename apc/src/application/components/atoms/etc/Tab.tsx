import React, { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';

export interface HeadTabItem {
  label: string;
  href: string;
}

// TODO: We will need to add hasIcon, etc. later
export interface CardTabItem {
  label: string;
  hasBadge?: boolean;
  badgeNumber?: number;
}

interface CardCommonProps<T> {
  size: 'Small' | 'Big';
  activeTab: string;
  tabs: T[];
}

export interface CardTabProps extends CardCommonProps<CardTabItem> {
  variant: 'Card';
  onToggle: (tab: CardTabItem['label']) => void;
}

export interface HeadTabProps extends CardCommonProps<HeadTabItem> {
  variant: 'Head';
}

export const Tab: FC<HeadTabProps | CardTabProps> = (props) => {
  const router = useRouter();
  const { tabs, variant, activeTab, size = 'Small' } = props;
  const { onToggle } = props as CardTabProps;

  return (
    <Container size={size}>
      {tabs.map((tab, key) => {
        return (
          <TabItemContainer key={key} variant={variant}>
            {variant === 'Card' ? (
              <>
                {tab.hasBadge && <Badge>{tab.badgeNumber}</Badge>}
                <Item
                  minWidth={48}
                  text={tab.label}
                  isActive={activeTab === tab.label}
                  onClick={() => onToggle(tab.label)}
                >
                  {tab.label}
                </Item>
                {activeTab === tab.label && <Indicator variant={variant} />}
              </>
            ) : (
              <>
                <Link href={tab.href}>
                  <Item
                    minWidth={24}
                    text={tab.label}
                    isActive={router.pathname === tab.href}
                  >
                    {tab.label}
                  </Item>
                </Link>
                {router.pathname === tab.href && <Indicator variant={variant} />}
              </>
            )}
          </TabItemContainer>
        );
      })}
    </Container>
  );
};

interface TabSize {
  size: 'Small' | 'Big';
}

const Container = styled.div<TabSize>`
  display: flex;
  font-size: ${({ size }) => (size === 'Small' ? 16 : 20)}px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

interface ItemProps {
  text: string;
  minWidth: number;
  isActive: boolean;
}

const Item = styled.div<ItemProps>`
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.text.contrast.secondary : theme.link.text};
  min-width: ${({ minWidth }) => minWidth}px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  /* This is to fix bold re-layout */
  &:after {
    height: 0;
    display: block;
    content: '${({ text }) => text}';
    visibility: hidden;
    user-select: none;
    font-weight: bold;
  }
  &:hover {
    color: ${({ theme }) => theme.text.contrast.secondary};
  }
`;

interface IndicatorProps {
  variant: 'Head' | 'Card';
}

const Indicator = styled.div<IndicatorProps>`
  height: 4px;
  border-radius: 1px;
  margin: ${({ variant }) =>
    variant === 'Card' ? '12px 0px 0px 0px' : '12px auto 0px auto'};
  background-color: ${({ theme }) => theme.palette.primary};
  width: ${({ variant }) => (variant === 'Head' ? 24 : 48)}px;
`;

const TabItemContainer = styled.div<IndicatorProps>`
  position: relative;
  margin-right: ${({ variant }) => (variant === 'Head' ? 24 : 36)}px;
`;

const Transition = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Badge = styled.div`
  top: -10px;
  width: 16px;
  height: 16px;
  right: -18px;
  border-radius: 50%;
  position: absolute;
  animation-delay: 1s;
  animation-duration: 2s;
  animation-iteration-count: 3;
  animation-name: ${Transition};
  background-color: ${({ theme }) => theme.badge};
  display: flex;
  align-item: start;
  justify-content: center;
  color: #fff;
  font-size: 13px;
`;
