import React from 'react';

import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import Heading from '../markdown/Heading';

import OnThisPage, { OnThisPageProps } from './OnThisPage';

export default {
  title: 'Atoms / Navigation',
  component: OnThisPage,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fdc9461098bb47d80d1f',
  },
};

export const OnThisPageCmp: StoryFC<OnThisPageProps> = (args) => {
  return (
    <Container>
      <CustomOnThisPage {...args} />
      <Contents>
        {args.headings.map((page, key) => (
          <Heading key={key} variant="h3">
            {page}
          </Heading>
        ))}
      </Contents>
    </Container>
  );
};

OnThisPageCmp.args = {
  headings: ['Account', 'Security', 'Usage', 'Payment methods', 'Billing'],
};

const Container = styled.div`
  gap: 36px;
  display: flex;
`;

const CustomOnThisPage = styled(OnThisPage)`
  top: 0;
  position: sticky;
`;

const Contents = styled.div`
  gap: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
