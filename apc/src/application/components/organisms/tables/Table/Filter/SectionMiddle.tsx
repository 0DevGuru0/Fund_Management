import React, { useContext, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { includes } from 'lodash';
import styled from 'styled-components';

import { Checkbox } from '$application/components/atoms/inputs/CheckBox';
import { ToggleSelect } from '$application/components/organisms/tables/Table/ToggleSelect';

import { FilterContext, FilterVariant } from './FilterContext';
import { filterModifier } from './utils';

export const SectionMiddle = () => {
  const {
    variant,
    toggleAtom,
    filtersAtom,
    toggleItems,
    showSelectAll,
    showToggleAtom,
    filterCardOpenAtom,
    selectAllCheckedAtom,
  } = useContext(FilterContext);

  const showToggle = useAtomValue(showToggleAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const filterCardOpen = useAtomValue(filterCardOpenAtom);
  const [toggledList, setToggledList] = useAtom(toggleAtom);
  const [isSelectAllChecked, setIsSelectAllChecked] = useAtom(selectAllCheckedAtom);

  const showToggleVariants: FilterVariant[] = [
    'WithSortAndToggle',
    'SearchAndSortAndToggle',
  ];

  const handleSelectAllChange = () => {
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  useEffect(() => {
    setToggledList((filters.toggle as string[]) ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleToggleChange = (item: string) => {
    setFilters(filterModifier({ name: 'toggle', value: item }, filters, true));
  };

  return (
    <Container>
      {!filterCardOpen && showToggle && includes(showToggleVariants, variant) && (
        <ToggleContainer>
          <ToggleSelect
            items={toggleItems}
            selectedItems={toggledList}
            onSelect={handleToggleChange}
          />
        </ToggleContainer>
      )}
      <CheckboxContainer>
        {showSelectAll && (
          <CustomCheckbox
            id="SelectAll"
            label="Select All"
            isChecked={isSelectAllChecked}
            onChange={handleSelectAllChange}
          />
        )}
      </CheckboxContainer>
    </Container>
  );
};

export default SectionMiddle;

const Container = styled.div`
  flex: 1;
  display: flex;
  margin-right: 36px;
`;

const ToggleContainer = styled.div`
  flex: 1;
  padding: 6px 0;
  padding-right: 0px;
`;

const CheckboxContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const CustomCheckbox = styled(Checkbox)`
  margin: 12px 0;
  margin-left: 48px;
`;
