import React, { useContext } from 'react';

import { useAtom } from 'jotai';
import styled from 'styled-components';

import { Search } from '$application/components/molecules/inputs/Search';

import { FilterContext } from './FilterContext';
import { FilterButton } from './SectionStart/FilterButton';

export const SectionStart = () => {
  const { variant, filtersAtom, searchPlaceholder } = useContext(FilterContext);

  const [filters, setFilters] = useAtom(filtersAtom);

  const searchHandler = (searchPhrase) => {
    setFilters({ ...filters, searchPhrase });
  };

  return (
    <Container>
      <Search onChange={searchHandler} placeholder={searchPlaceholder} />
      {variant !== 'SearchOnly' && variant !== 'SearchAndSortAndToggle' && (
        <FilterButton />
      )}
    </Container>
  );
};

export default SectionStart;

const Container = styled.div`
  display: flex;
  margin-right: 24px;
`;
