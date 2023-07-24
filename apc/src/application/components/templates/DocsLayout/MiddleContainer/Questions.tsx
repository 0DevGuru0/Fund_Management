import React from 'react';

import styled from 'styled-components';

import Link from '$application/components/atoms/markdown/Link';

const Questions = () => {
  return (
    <Container>
      <Title>Questions?</Title>
      <Body>
        We are always happy to help you with the questions you might have. You can
        <Link href="#">search</Link>
        through our documentation and check out the answers to the common questions.
      </Body>
    </Container>
  );
};

export default Questions;

const Container = styled.div`
  padding: 24px;
  margin-top: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.grey[400]};
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
`;

const Body = styled.div`
  font-size: 16px;
  margin-top: 12px;
  line-height: 24px;
`;
