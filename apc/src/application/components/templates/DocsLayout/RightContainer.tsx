import React, { FC } from 'react';

import styled from 'styled-components';

import OnThisPage from '$application/components/atoms/navigation/OnThisPage';
import Tags from '$application/components/atoms/navigation/Tags';

export interface RightContainerProps {
  tags?: string[];
  onTagSelect?: (tag: string) => void;
  headings?: string[];
}

const RightContainer: FC<RightContainerProps> = ({ tags, headings, onTagSelect }) => {
  return (
    <Container>
      {headings && headings.length > 0 && <StyledOnThisPage headings={headings} />}
      {tags && <Tags tags={tags} onClick={onTagSelect} />}
    </Container>
  );
};

export default RightContainer;

const StyledOnThisPage = styled(OnThisPage)`
  margin-bottom: 48px;
`;

const Container = styled.div`
  width: 226px;
`;
