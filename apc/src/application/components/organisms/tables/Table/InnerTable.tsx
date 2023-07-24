import React, { useMemo } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import ScrollContainer, { ScrollContainerProps } from 'react-indiana-drag-scroll';
import styled from 'styled-components';

import { Definition, TableProps } from '../Table';

import { header } from './sharedTableStyle';
import { hoveredRow, overflowScrollNone } from './store';

import { hideScrollBar } from '$utils';

export const InnerTable = <T extends readonly Definition[]>(props: TableProps<T>) => {
  const { definitions, items, onRowClick, isAdmin = false } = props;
  const [_hoveredRow, setHoveredRow] = useAtom(hoveredRow);
  const _overflowNone = useAtomValue(overflowScrollNone);

  const colsWidth = useMemo(() => {
    return definitions.map((el) => `minmax(${el.width}, auto)`).join(' ');
  }, [definitions]);

  if (typeof window === 'undefined') {
    return <div />;
  }
  return (
    <TableScrollContainer
      vertical={false}
      colStart={2}
      colEnd={3}
      rowStart={1}
      overflowNone={_overflowNone}
      rowEnd={items.length + 2}
      colsWidth={colsWidth}
      onClick={() => !isAdmin && onRowClick && onRowClick(_hoveredRow)}
    >
      {definitions.map((el, idx) => (
        <Header key={idx} colStart={idx + 1} colEnd={idx + 2} rowStart={1} rowEnd={2}>
          {el.label}
        </Header>
      ))}
      {items.map((rowData, rowIndex) => {
        return Object.keys(rowData).map((cellName, cellIndex) => {
          const Renderer = definitions[cellIndex].renderer;
          return (
            <DataCell
              key={`${rowIndex}_${cellIndex}`}
              colStart={cellIndex + 1}
              colEnd={cellIndex + 2}
              rowStart={rowIndex + 2}
              rowEnd={rowIndex + 3}
              onMouseOver={() => setHoveredRow(rowIndex)}
              clickable={!!onRowClick && !isAdmin}
            >
              <Renderer {...rowData[cellName]} />
            </DataCell>
          );
        });
      })}
    </TableScrollContainer>
  );
};

interface CellProps {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
}
type TableScrollContainerProps = CellProps &
  ScrollContainerProps & {
    colsWidth: string;
    overflowNone: boolean;
  };

const TableScrollContainer = styled(ScrollContainer)<TableScrollContainerProps>`
  height: 100%;
  overflow-x: 'scroll';
  overflow: ${({ overflowNone }) => (overflowNone ? 'unset' : 'auto')};
  z-index: 2;
  display: grid;
  grid-template-rows: 52px;
  grid-template-columns: ${({ colsWidth }) => colsWidth};
  grid-row-gap: 1px;
  grid-row: ${({ rowStart, rowEnd }) => `${rowStart} / ${rowEnd}`};
  grid-column: ${({ colStart, colEnd }) => `${colStart} / ${colEnd}`};
  grid-auto-rows: 92px;
  grid-auto-columns: ${({ colsWidth }) => colsWidth};
  background-color: ${({ theme }) => theme.background.secondary};
  background-image: linear-gradient(
      to right,
      ${({ theme }) => theme.background.secondary},
      ${({ theme }) => theme.background.secondary}
    ),
    linear-gradient(
      to right,
      ${({ theme }) => theme.background.secondary},
      ${({ theme }) => theme.background.secondary}
    ),
    linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-size: 24px 100%, 24px 100%, 12px 100%, 12px 100%;
  background-attachment: local, local, scroll, scroll;

  ${hideScrollBar}
`;

type DataCellProps = CellProps & {
  clickable: boolean;
};

const DataCell = styled.div<DataCellProps>`
  padding: 4px;
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
  justify-content: center;
  align-items: stretch;

  grid-row: ${({ rowStart, rowEnd }) => `${rowStart} / ${rowEnd}`};
  grid-column: ${({ colStart, colEnd }) => `${colStart} / ${colEnd}`};

  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'inherit')};
`;

const Header = styled.div<CellProps>`
  ${header}
  padding-left: 36px;
  background-color: ${({ theme }) => theme.palette.primaryLight};
  grid-row: ${({ rowStart, rowEnd }) => `${rowStart} / ${rowEnd}`};
  grid-column: ${({ colStart, colEnd }) => `${colStart} / ${colEnd}`};
`;
