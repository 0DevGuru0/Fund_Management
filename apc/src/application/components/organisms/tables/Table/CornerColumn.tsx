import React from 'react';

import { useAtom } from 'jotai';
import styled, { css } from 'styled-components';

import { Definition } from '../Table';

import { header } from './sharedTableStyle';
import { hoveredRow } from './store';

type ColumnPosition = 'left' | 'right';
export interface TableProps<T extends Definition> {
  items: any[];
  definition: T;
  position: ColumnPosition;
  rounded?: boolean;
  onRowClick?: (rowId: number) => void;
}

export const CornerColumn = <T extends Definition>(props: TableProps<T>) => {
  const { definition, items, position, onRowClick, rounded = false } = props;
  const [_hoveredRow, setHoveredRow] = useAtom(hoveredRow);

  return (
    <div onClick={() => onRowClick && onRowClick(_hoveredRow)}>
      <Header position={position}>{definition.label}</Header>
      {items.map((item, idx) => {
        const Renderer = definition.renderer;
        return (
          <DataCell
            $position={position}
            key={idx}
            $clickable={!!onRowClick}
            $rounded={rounded}
          >
            <div onMouseOver={() => setHoveredRow(idx)}>
              <Renderer {...item} isHovered={_hoveredRow === idx} />
            </div>
          </DataCell>
        );
      })}
    </div>
  );
};

const typography = css`
  font-weight: ${({ theme }) => theme.typography.fontWeight};
`;

interface IHeader {
  position: ColumnPosition;
}

const Header = styled.div<IHeader>`
  ${typography}
  ${header}
  height:52px;
  padding-left: ${({ position }) => (position === 'left' ? '76' : '36')}px;
  border-radius: ${({ position }) =>
    position === 'left' ? '12px 0 0 12px' : ' 0 12px 12px 0'};
  background-color: ${({ theme }) => theme.background.secondary};
`;

interface IDataCell {
  $position: ColumnPosition;
  $clickable: boolean;
  $rounded: boolean;
}
const DataCell = styled.div<IDataCell>`
  padding-left: ${({ $position }) => ($position === 'right' ? '36px' : '24px')};
  padding-right: ${({ $position }) => $position === 'left' && '0px'};
  ${({ $position, $rounded }) =>
    $rounded
      ? $position === 'left'
        ? css`
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
          `
        : css`
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
          `
      : ''}
  border-top: 1.5px solid #fff;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
  background-color: ${({ theme }) => theme.background.primary};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'inherit')};
  height: 91px;
  display: flex;
  align-items: center;
`;

export default CornerColumn;
