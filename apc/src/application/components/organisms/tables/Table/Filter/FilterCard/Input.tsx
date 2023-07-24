import React, { FC } from 'react';

import styled from 'styled-components';

import { Select } from '$application/components/molecules/inputs/Select';

import { InputFilterItem } from '../filterTypes';
import { FilterItem } from '../utils';

interface InputsProps {
  input: InputFilterItem;
  selectedItems: string[];
  filterHandler: (item: FilterItem, canHaveMultipleValue?: boolean) => void;
}

export const Input: FC<InputsProps> = ({ input, selectedItems, filterHandler }) => {
  return (
    <FilterOptions id={`filter_${input.name}`}>
      {input.rendererComponent ? (
        input.rendererComponent?.({
          filterHandler,
          input,
          selectedItems,
        })
      ) : (
        <Select
          label={input.label}
          items={input.items ?? []}
          icon={input.startAdornment}
          selectedItems={selectedItems}
          disabled={input.disabled ?? false}
          multiSelectable={input.multiSelect}
          onSelect={(value) =>
            filterHandler({ name: input.name, value }, input.multiSelect)
          }
        />
      )}
    </FilterOptions>
  );
};

export default Input;

const FilterOptions = styled.div`
  height: 84px;
`;
