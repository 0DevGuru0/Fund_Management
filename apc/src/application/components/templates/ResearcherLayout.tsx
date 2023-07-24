/* eslint-disable no-console */
import React from 'react';

import { isEmpty } from 'lodash';
import styled from 'styled-components';

import { Footer } from '$application/components/atoms/etc/Footer';
import footerConfig from '$application/components/atoms/etc/Footer/footer.config';
import { researcherLayoutConfig } from '$application/components/templates/ResearcherLayout/header.config';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { hideScrollBar } from '$application/utils/css/hideScrollBar';

import ErrorPage from '../molecules/etc/ErrorPage';

import { Header } from './ResearcherLayout/Header';

interface Props {
  children?: JSX.Element;
}
export const ResearcherLayout = ({ children }: Props) => {
  const header = researcherLayoutConfig.header[0];

  const userInfo = useUserInfo();
  const hasAccess = Object.keys(userInfo?.roles).includes('Researcher');
  if (isEmpty(userInfo?.roles) || !hasAccess) {
    return (
      <Wrapper>
        <ErrorPage errorCode="403" description="You don't have access to this page" />;
      </Wrapper>
    );
  }

  return (
    <Container>
      <Header
        links={header.links}
        notifyStatus={{ status: 'seen' }}
        services={header.services}
        search={{ onChange: () => console.log('Searched') }}
      />
      <Body>
        {children}
        <ExtendedFooter narrowPadding={false} footerConfig={footerConfig} />
      </Body>
    </Container>
  );
};

export default ResearcherLayout;

const headerHeight = 84;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  ${hideScrollBar}
  margin-top: ${headerHeight}px;
  min-height: calc(100vh - ${headerHeight}px);
  background-color: ${({ theme }) => theme.background.secondary};
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  height: inherit;
  & > div:nth-last-child(2) {
    flex: 1;
  }
`;

const ExtendedFooter = styled(Footer)`
  && {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
