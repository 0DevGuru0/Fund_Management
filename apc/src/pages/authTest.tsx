/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { useAtomValue } from 'jotai/utils';
import { NextPage } from 'next';
import styled from 'styled-components';

import { userTokenAtom } from '$application/lib/auth/store';

const AuthTest: NextPage = () => {
  const userToken = useAtomValue(userTokenAtom);

  return (
    <Container>
      <div>
        {userToken
          ? `Welcome ${userToken.given_name} ${userToken.family_name}`
          : `You haven't logged in`}
      </div>
      <div>
        {userToken ? (
          <a href="/api/v1/auth/logout">
            <SampleText>Logout</SampleText>
          </a>
        ) : (
          <a href="/api/v1/auth/login">
            <SampleText>Login</SampleText>
          </a>
        )}
      </div>
    </Container>
  );
};

export default AuthTest;

const Container = styled.div`
  padding: 1rem;
`;

const SampleText = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 100px;
  text-align: center;
  margin: 12px 0;
  padding: 8px;
  border: 2px solid #0091ea;
  border-left-width: 6px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
`;
