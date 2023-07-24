import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const UnAuthorizedPage: NextPage = () => {
  return (
    <Container>
      <ErrorText>{`⚠️ Forbidden Access (Authorization error)! Please Login ⚠️`}</ErrorText>
      <div>
        <Link href="/authTest">
          <Button>Go To Auth Test Page</Button>
        </Link>
      </div>
    </Container>
  );
};

export default UnAuthorizedPage;

const Container = styled.div`
  padding: 2rem;
  margin: 2rem;
  text-align: center;
`;

const ErrorText = styled.div`
  margin: 0.5rem;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary};
`;

const Button = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 6px 0;
  padding: 6px;
  border: 2px solid;
  border-left: 6px solid;
  border-color: #0091ea;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
`;
