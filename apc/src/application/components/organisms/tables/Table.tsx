import React, { FC } from 'react';

import { useUpdateAtom } from 'jotai/utils';
import { first, last, pick } from 'lodash';
import styled from 'styled-components';

import CornerColumn from './Table/CornerColumn';
import { InnerTable } from './Table/InnerTable';
import { hoveredRow } from './Table/store';

export interface Definition {
  width: string;
  column: string;
  label: string;
  renderer: FC<any>;
}

export interface TableProps<T extends readonly Definition[]> {
  items: Record<T[number]['column'], any>[];
  definitions: T;
  isLastFixed?: boolean;
  onRowClick?: (rowId: number) => void;
  rounded?: boolean;
  isAdmin?: boolean;
}

export const Table = <T extends readonly Definition[]>(props: TableProps<T>) => {
  const {
    definitions,
    items,
    onRowClick,
    isLastFixed = true,
    rounded = false,
    isAdmin,
  } = props;

  const setHoveredRow = useUpdateAtom(hoveredRow);

  const firstDefinition = first(definitions) as Definition;

  const lastDefinition = last(definitions) as Definition;

  const innerTableDefinitions = isLastFixed
    ? definitions.slice(1, -1)
    : definitions.slice(1);

  const innerTableDefinitionColNames = innerTableDefinitions.map((def) => def.column);

  const innerTableItems = items.map((item) => pick(item, innerTableDefinitionColNames));

  return (
    <Grid
      isLastHidden={!isLastFixed}
      firstColWidth={firstDefinition.width}
      lastColWidth={lastDefinition.width}
      onMouseLeave={() => setHoveredRow(-1)}
    >
      <CornerColumn
        items={items.map((item) => item[firstDefinition.column])}
        definition={firstDefinition}
        position="left"
        onRowClick={onRowClick}
        rounded={rounded}
      />
      <InnerTable
        onRowClick={onRowClick}
        definitions={innerTableDefinitions}
        items={innerTableItems}
        isAdmin={isAdmin}
      />
      {isLastFixed && (
        <CornerColumn
          items={items.map((item) => item[lastDefinition.column])}
          definition={lastDefinition}
          position="right"
          onRowClick={onRowClick}
          rounded={rounded}
        />
      )}
    </Grid>
  );
};

interface TableGrid {
  lastColWidth: string;
  firstColWidth: string;
  isLastHidden: boolean;
}

const Grid = styled.div<TableGrid>`
  height: inherit;
  margin-bottom: 100px;
  width: 100%;
  display: grid;
  grid-row-gap: 1px;
  grid-auto-rows: 92px;
  grid-template-rows: 52px;
  grid-template-columns: ${({ firstColWidth, lastColWidth, isLastHidden }) =>
    isLastHidden ? `${firstColWidth} 1fr ` : `${firstColWidth} 1fr ${lastColWidth}`};
`;
