import React, { FC } from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';
// import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

import { Footer } from '$application/components/atoms/etc/Footer';
import footerConfig from '$application/components/atoms/etc/Footer/footer.config';
import Heading from '$application/components/atoms/markdown/Heading';
import { hideScrollBar } from '$application/utils/css/hideScrollBar';
import { PageProps } from '$pages/_layout';

import DocsHeader from './DocsLayout/DocsHeader';
import { docsLayoutConfig } from './DocsLayout/header.config';
import LeftContainer from './DocsLayout/LeftContainer';
import MiddleContainer from './DocsLayout/MiddleContainer';
import RightContainer from './DocsLayout/RightContainer';
import { helpAtom, searchAtom } from './DocsLayout/store';
import { Header } from './ResearcherLayout/Header';

export interface DocsProps {
  rootID?: string;
}

export const DocsLayout: FC<PageProps> = ({ docsProps, children }) => {
  const header = docsLayoutConfig.header;
  const help = useAtomValue(helpAtom);
  const setSearch = useUpdateAtom(searchAtom);

  return (
    <Container>
      <Header
        links={header.links}
        services={header.services}
        notifyStatus={{ status: 'seen' }}
      />
      <DocsHeader />
      <Body>
        <InnerBody>
          <LeftContainer rootID={docsProps?.rootID} />
          <MiddleContainer
            {...docsProps!}
            title={help?.label ?? 'Getting Started'}
            description="This page provides all published technical documentation for the iKNiTO platform"
          >
            {help ? (
              <>
                <Content
                  dangerouslySetInnerHTML={{
                    // TODO: html sanitiser strips img tags from repo
                    __html: help?.content ?? '',
                  }}
                />
                {help.items?.map((i) => (
                  <div key={i.id}>
                    <Heading variant="h2">{i.label}</Heading>
                    <Content
                      dangerouslySetInnerHTML={{
                        // TODO: html sanitiser strips img tags from repo
                        __html: i.content ?? '',
                      }}
                    />
                  </div>
                ))}
              </>
            ) : (
              children
            )}
          </MiddleContainer>
          <RightContainer
            headings={help?.items?.map((i) => i.label)}
            tags={help?.tags}
            onTagSelect={(tag) => setSearch(tag)}
          />
        </InnerBody>
        <ExtendedFooter narrowPadding={false} footerConfig={footerConfig} />
      </Body>
    </Container>
  );
};

export default DocsLayout;

const footerHeight = 68;
const bottomMargin = 48;
const headerHeight = 84 + 270; // Header and Top Section

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  ${hideScrollBar};
  max-width: 1920px;
  background-color: ${({ theme }) => theme.background.primary};
  height: calc(100vh - ${footerHeight + headerHeight + bottomMargin}px);
`;

const ExtendedFooter = styled(Footer)`
  background-color: ${({ theme }) => theme.background.primary};
`;

const InnerBody = styled.div`
  display: flex;
  margin: 48px 186px 0;
  min-height: 45vh;
`;

const Content = styled.div`
  img {
    max-width: 600px;
  }

  font-size: 16px;
  line-height: 1.5;
`;
