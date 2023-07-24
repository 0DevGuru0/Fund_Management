import React, { useContext, useEffect } from 'react';

import gsap from 'gsap';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import { AnimationWrapper } from '$application/lib/animation/AnimationWrapper';
import { isArrayOfString } from '$application/utils/isArrayOfString';

import { FilterCheckbox } from './FilterCard/FilterCheckbox';
import HeaderSection from './FilterCard/HeaderSection';
import Input from './FilterCard/Input';
import { FilterContext } from './FilterContext';
import { FilterItem, filterModifier } from './utils';

export const FilterCard = () => {
  const { cardType, filtersAtom, showToggleAtom, config } = useContext(FilterContext);

  const [filters, setFilters] = useAtom(filtersAtom);
  const setShowToggle = useUpdateAtom(showToggleAtom);

  const { inputs, checkboxes } = config;

  const animation = (element) => gsap.from(element, { opacity: 0 });

  const filterHandler = (item: FilterItem, canHaveMultipleValue?: boolean) => {
    // If user chose the items that are appeared in toggle, hide the toggle
    if (item.name === 'toggle') {
      setShowToggle(false);
    }
    setFilters(filterModifier(item, filters, canHaveMultipleValue));
  };

  useEffect(() => {
    setShowToggle(isEmpty(filters.toggle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <AnimationWrapper gsapHandler={animation}>
      <Container $variant={cardType}>
        <HeaderSection />
        {inputs && (
          <SelectableFilters>
            {inputs.map((input, idx) => {
              const filterItem = filters?.[input.name];
              const selectedItems = filterItem
                ? isArrayOfString(filterItem)
                  ? filterItem
                  : filterItem.map((item) => item.value)
                : [];
              return (
                <React.Fragment key={`${input.name}-${idx}`}>
                  <Input
                    input={input}
                    selectedItems={selectedItems}
                    filterHandler={filterHandler}
                  />
                </React.Fragment>
              );
            })}
          </SelectableFilters>
        )}
        {checkboxes?.map((item, idx) => (
          <React.Fragment key={`${item.name}-${idx}`}>
            <FilterCheckbox item={item} filterHandler={filterHandler} />
          </React.Fragment>
        ))}
      </Container>
    </AnimationWrapper>
  );
};

interface CardProps {
  $variant: 'Default' | 'Bordered';
}

const Container = styled.div<CardProps>`
  padding: 36px;
  width: inherit;
  height: max-content;
  border-radius: 12px;
  margin-bottom: 36px;
  background-color: ${({ theme }) => theme.background.primary};
  border: ${({ theme, $variant }) =>
    $variant === 'Bordered' ? `solid 1px ${theme.border}` : 'unset'};
  box-shadow: ${({ theme, $variant }) =>
    $variant === 'Default' ? `0 2px 6px 0 ${theme.palette.primaryLight}` : 'unset'};
`;

const SelectableFilters = styled.div`
  display: grid;
  margin-bottom: 36px;
  grid-gap: 36px 24px;
  grid-template-columns: repeat(4, minmax(200px, 468px));
`;
