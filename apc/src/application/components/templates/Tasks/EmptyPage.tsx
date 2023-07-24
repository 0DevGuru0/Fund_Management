import React, { FC } from 'react';

import styled from 'styled-components';

import EmptyInboxSVG from '$application/assets/colored-icons/EmptyInboxSVG.svg';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

export const EmptyPage: FC = () => (
  <Wrapper>
    <EmptyResultContainer>
      <EmptyContentHolder
        icon={<EmptyInbox />}
        title="No requests found in your inbox"
        description="You can extend the request and assign it to someone"
      />
    </EmptyResultContainer>
  </Wrapper>
);

export default EmptyPage;

const Wrapper = styled.div`
  padding: 36px;
`;
const EmptyResultContainer = styled.div`
  padding: 36px;
`;

const EmptyInbox = styled(EmptyInboxSVG)`
  width: 250px;
  height: 200px;
  margin-top: 148px;
`;
