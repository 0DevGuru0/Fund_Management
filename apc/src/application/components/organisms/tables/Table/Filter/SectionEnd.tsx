import React, { useContext } from 'react';

import { useAtom } from 'jotai';
import { includes } from 'lodash';
import styled from 'styled-components';

import { SortBy } from '$application/components/organisms/etc/SortBy';

import { FilterContext, FilterVariant } from './FilterContext';

export const SectionEnd = () => {
  const { variant, sortByAtom, sortOptions } = useContext(FilterContext);

  const [sortBy, setSortBy] = useAtom(sortByAtom);

  const showSortVariants: FilterVariant[] = [
    'WithSort',
    'WithSortAndToggle',
    'WithSortAndSelectAll',
    'SearchAndSortAndToggle',
  ];

  return (
    <Container>
      {includes(showSortVariants, variant) && sortOptions && (
        <SortBy options={sortOptions} onSelect={setSortBy} selectedOption={sortBy} />
      )}
    </Container>
  );
};

export default SectionEnd;

const Container = styled.div`
  display: flex;
`;
