import React, { FC } from 'react';

import styled from 'styled-components';

import { IData } from '../nivoCommonTypes';

interface LegendsProps {
  data: IData[];
  withGrid: boolean;
  marginLeft: number;
}

export const Legends: FC<LegendsProps> = ({ data, withGrid, marginLeft }) => (
  <LegendsGrid withGrid={withGrid} marginLeft={marginLeft}>
    {data.map((d) => (
      <LegendLabel key={d.id}>
        <LegendLabelSymbol>
          <rect fill={d.color} width={6} height={20} rx={4} />
        </LegendLabelSymbol>
        <LegendLabelTitle>{d.label}</LegendLabelTitle>
        <LegendLabelValue>{d.value.toString().padStart(2, '0')}</LegendLabelValue>
      </LegendLabel>
    ))}
  </LegendsGrid>
);

interface LegendGridProps {
  withGrid: boolean;
  marginLeft: number;
}

const LegendsGrid = styled.div<LegendGridProps>`
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  display: grid;
  grid-template-columns: ${({ withGrid }) => (withGrid ? '1fr 1fr' : '1fr')};
  row-gap: 16px;
  grid-auto-flow: row;
`;

const LegendLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 56px;
`;

const LegendLabelTitle = styled.span`
  flex: 1;
  font-size: 16px;
  margin-right: 60px;
`;

const LegendLabelValue = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-weight: bold;
`;

const LegendLabelSymbol = styled.svg`
  padding-right: 5px;
  width: 6px;
  height: 20px;
`;

export default Legends;
