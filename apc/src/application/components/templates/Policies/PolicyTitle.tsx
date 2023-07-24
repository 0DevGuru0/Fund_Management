import React, { FC } from 'react';

import { capitalize } from 'lodash';
import styled from 'styled-components';
import truncate from 'truncate-middle';

const textOffset = 120;

export interface PolicyTitleProps {
  id: string;
  index: number;
  width: number;
  title: string;
  policyType: string;
}

export const PolicyTitle: FC<PolicyTitleProps> = ({
  id,
  index,
  title,
  width,
  policyType,
}) => {
  const truncatedTitle = truncate(title, 30, 30, '...');

  return (
    <Container>
      <IndexContainer>
        <Index>{(index + 1).toString().padStart(2, '0')}</Index>
      </IndexContainer>
      <PolicyInfoContainer>
        <TextContainer>
          <Title width={width}>{truncatedTitle}</Title>
          <PolicyType>{capitalize(policyType)}</PolicyType>
        </TextContainer>
      </PolicyInfoContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
  background-color: transparent;
`;

const TextContainer = styled.div`
  display: block;
  margin: auto 0;
`;

const PolicyInfoContainer = styled.div`
  display: flex;
  margin: auto 0;
`;

const IndexContainer = styled.div`
  margin: auto 0;
  line-height: 18px;
  margin-right: 12px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

interface TitleProps {
  width: number;
}

const Title = styled.div<TitleProps>`
  font-size: 16px;
  font-weight: 600;
  max-height: 40px;
  line-height: 20px;
  width: ${({ width }) => `${width - textOffset}px`};
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const PolicyType = styled.div`
  margin-top: 6px;
  line-height: 18px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const Index = styled.div`
  width: 28px;
  height: 18px;
  margin-right: 24px;
`;
