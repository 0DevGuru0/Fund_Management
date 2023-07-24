import React, { FC } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';

export interface ErrorPageProps {
  errorCode: string;
  description: string;
  buttonText?: string;
  redirectPath?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({
  errorCode,
  description,
  redirectPath,
  buttonText = 'Try Again',
}) => (
  <Container>
    <ErrorCode>{errorCode}</ErrorCode>
    <Description>{description}</Description>
    <Link href={redirectPath || '/'}>
      <Button color="primary" customSize="md" title={buttonText} variant="outlined" />
    </Link>
  </Container>
);

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ErrorCode = styled.div`
  font-size: 120px;
  font-weight: bold;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const Description = styled.div`
  font-size: 16px;
  max-width: 500px;
  line-height: 1.5;
  text-align: center;
  margin: 0 auto 24px auto;
  color: ${({ theme }) => theme.text.contrast.primary};
`;
