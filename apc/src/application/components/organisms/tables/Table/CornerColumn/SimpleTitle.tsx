import React, { FC } from 'react';

import styled from 'styled-components';
import truncate from 'truncate-middle';

import { Checkbox } from '$application/components/atoms/inputs/CheckBox';

const TEXT_OFFSET = 120;

export interface SimpleTitleProps {
  id: string;
  index: number;
  title: string;
  taskKey?: string;
  isChecked: boolean;
  width: number;
  isHovered: boolean;
  onToggle: (selected: boolean, taskKey: string) => void;
}

export const SimpleTitle: FC<SimpleTitleProps> = ({
  id,
  isChecked,
  index,
  title,
  taskKey,
  width,
  isHovered,
  onToggle,
}) => {
  const actualWidth = width - TEXT_OFFSET;
  const truncatedTitle = truncate(
    title,
    Math.floor(actualWidth / 10),
    Math.floor(actualWidth / 10),
    '...',
  );

  const handleClick = () => onToggle(!isChecked, id);

  return (
    <MainContainer>
      <IndexContainer>
        <IndexText isChecked={isChecked} isHovered={isHovered}>
          {(index + 1).toString().padStart(2, '0')}
        </IndexText>
        <IndexCheckbox isChecked={isChecked} isHovered={isHovered}>
          <Checkbox id={id} isChecked={isChecked} onChange={handleClick} />
        </IndexCheckbox>
      </IndexContainer>
      <TextContainer onClick={handleClick}>
        <TitleContainer width={width}>{truncatedTitle}</TitleContainer>
        {taskKey && (
          <KeyContainer>
            ID: <KeySpan>{taskKey.toString().padStart(4, '0')}</KeySpan>
          </KeyContainer>
        )}
      </TextContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: stretch;
  background-color: transparent;
  height: 100%;
`;

const TextContainer = styled.div`
  display: block;
  margin: auto 0;
`;

const IndexContainer = styled.div`
  line-height: 18px;
  margin: auto 0;
  color: ${({ theme }) => theme.text.lowContrast};
`;

interface TitleContainerProps {
  width: number;
}

const TitleContainer = styled.div<TitleContainerProps>`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  max-height: 40px;
  width: ${({ width }) => `${width - TEXT_OFFSET}px`};
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const KeyContainer = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.link.text};
`;

const KeySpan = styled.span`
  ${MainContainer}:hover & {
    color: ${({ theme }) => theme.link.hover};
  }
`;

interface IndexProps {
  isChecked: boolean;
  isHovered: boolean;
}

const IndexText = styled.div<IndexProps>`
  width: 28px;
  height: 18px;
  /* display: ${({ isChecked, isHovered }) =>
    isChecked || isHovered ? 'none' : 'block'}; */
  display: block;
  margin-right: 24px;
  /* ${MainContainer}:hover & {
    display: none;
  } */
`;

const IndexCheckbox = styled.div<IndexProps>`
  width: 20px;
  height: 20px;
  /* display: ${({ isChecked, isHovered }) =>
    isChecked || isHovered ? 'block' : 'none'}; */
  display: none;
  margin-right: 32px;
  margin-top: -20px;
  /* ${MainContainer}:hover & {
    display: block;
  } */
`;
