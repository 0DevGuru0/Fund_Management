import React, { FC, ReactElement } from 'react';

import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';

import ErrorPage from '$application/components/molecules/etc/ErrorPage';

export interface Props {
  loading: boolean;
  error?: any;
  customStyle?: React.CSSProperties;
  customLoaderWrapper?: (Loader: FC) => React.ReactElement;
  children(): ReactElement<any>;
}

export const LoadingData: FC<Props> = ({
  loading,
  error,
  children,
  customLoaderWrapper,
}) => {
  const router = useRouter();

  return (
    <>
      {loading || error ? (
        loading ? (
          customLoaderWrapper ? (
            customLoaderWrapper(Loader)
          ) : (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )
        ) : (
          error && (
            <ErrorPage
              errorCode={error.code || 500}
              redirectPath={router.pathname}
              description={error.message || 'We ran into a problem!'}
            />
          )
        )
      ) : (
        children()
      )}
    </>
  );
};

const Transition = keyframes`
 from {
   transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 40px;
  width: inherit;
  text-align: center;
  height: 200px;
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  animation-duration: 2s;
  animation-name: ${Transition};
  animation-iteration-count: infinite;
  border: 3px solid ${({ theme }) => theme.palette.grey[300]};
  border-top: 3px solid ${({ theme }) => theme.palette.primary};
`;
