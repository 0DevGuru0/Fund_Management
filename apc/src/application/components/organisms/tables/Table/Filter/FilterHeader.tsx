import React from 'react';

import styled from 'styled-components';

import SectionEnd from './SectionEnd';
import SectionMiddle from './SectionMiddle';
import SectionStart from './SectionStart';

export const FilterHeader = () => {
  return (
    <Container>
      <SectionStart />
      <SectionMiddle />
      <SectionEnd />
    </Container>
  );
};

export default FilterHeader;

const Container = styled.div`
  height: 48px;
  display: flex;
  margin-bottom: 24px;
`;
