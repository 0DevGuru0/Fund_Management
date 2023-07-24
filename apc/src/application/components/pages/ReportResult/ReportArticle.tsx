import React, { FC } from 'react';

import styled from 'styled-components';

export interface ReportArticleProps {
  id: string;
  index: number;
  article: string;
}

export const ReportArticle: FC<ReportArticleProps> = ({ id, index, article }) => {
  return (
    <Container>
      <IndexContainer>
        <Index>{(index + 1).toString().padStart(2, '0')}</Index>
      </IndexContainer>
      <ArticleContainer>
        <TextContainer>
          <Article>{article}</Article>
          <Id>ID: {id}</Id>
        </TextContainer>
      </ArticleContainer>
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

const ArticleContainer = styled.div`
  display: flex;
  margin: auto 0;
`;

const IndexContainer = styled.div`
  margin: auto 0;
  line-height: 18px;
  margin-right: 12px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const Article = styled.div`
  font-size: 16px;
  font-weight: 600;
  max-height: 40px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Id = styled.div`
  margin-top: 6px;
  line-height: 18px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const Index = styled.div`
  width: 28px;
  height: 18px;
  margin-right: 24px;
`;
