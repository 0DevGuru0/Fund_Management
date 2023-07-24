import React, { FC, useState } from 'react';

import clsx from 'classnames';
import { Link, Events } from 'react-scroll';
import styled from 'styled-components';

export interface OnThisPageProps {
  headings: string[];
  className?: string;
}

const OnThisPage: FC<OnThisPageProps> = ({ headings, className }) => {
  const [currentScroll, setCurrentScroll] = useState(headings[0]);

  // Setting current scroll element on click
  Events.scrollEvent.register('begin', (to: string) => {
    setCurrentScroll(to);
  });

  return (
    <Container className={clsx('OnThisPage', className)}>
      <div>On this page</div>
      {headings.map((heading, key) => {
        const normalizedName = heading.toLowerCase().replace(' ', '-');
        return (
          <Link key={key} smooth={true} to={normalizedName}>
            <Item $isSelected={normalizedName === currentScroll}>{heading}</Item>
          </Link>
        );
      })}
    </Container>
  );
};

export default OnThisPage;

const Container = styled.div`
  gap: 12px;
  display: flex;
  font-size: 16px;
  flex-direction: column;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

interface ItemProps {
  $isSelected: boolean;
}

const Item = styled.span<ItemProps>`
  cursor: pointer;
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.secondary : theme.palette.grey[800]};
  &:hover {
    color: ${({ theme }) => theme.text.contrast.secondary};
  }
`;
