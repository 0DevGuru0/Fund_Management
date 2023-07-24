import React, { FC } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

export interface TagsProps {
  tags: string[];
  className?: string;
  onClick?: (tag: string) => void;
  selectedTags?: string[];
}

const Tags: FC<TagsProps> = ({ tags, className, onClick, selectedTags }) => {
  return (
    <div className={clsx('Tags', className)}>
      <Header>Tags</Header>
      <Content>
        {tags.map((tag, key) => (
          <Item
            key={key}
            onClick={() => onClick?.(tag)}
            $isSelected={selectedTags?.includes(tag)}
          >
            {tag}
          </Item>
        ))}
      </Content>
    </div>
  );
};

export default Tags;

const Header = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Content = styled.div`
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
`;

interface ItemProps {
  $isSelected?: boolean;
}

const Item = styled.div<ItemProps>`
  cursor: pointer;
  font-size: 14px;
  padding: 1px 6px;
  border-radius: 12px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.primary : theme.palette.grey[400]};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.grey[100] : theme.palette.grey[800]};
  &:hover {
    color: ${({ theme }) => theme.palette.primary};
    background-color: ${({ theme }) => theme.palette.primaryWarm};
  }
`;
