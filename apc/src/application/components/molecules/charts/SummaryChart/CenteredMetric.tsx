import React, { FC } from 'react';

import { ComputedDatum } from '@nivo/pie';
import { sum } from 'lodash';
import styled from 'styled-components';

import { IData } from '../nivoCommonTypes';
import { CentricMetricStyle } from '../SummaryChart';

interface CenteredMetricProps {
  dataWithArc: ComputedDatum<IData>[];
  centerX: number;
  centerY: number;
  centeredMetricStyle?: CentricMetricStyle;
}

export const CenteredMetric: FC<CenteredMetricProps> = ({
  dataWithArc,
  centerX,
  centerY,
  centeredMetricStyle,
}) => {
  const total = sum(dataWithArc.map((dt) => dt.value));
  return (
    <>
      <ResultCount
        x={centerX + (centeredMetricStyle?.countStyle?.x ?? 0)}
        y={centerY - (centeredMetricStyle?.countStyle?.y ?? 5)}
        textAnchor="middle"
        dominantBaseline="central"
        style={centeredMetricStyle?.countStyle?.css}
      >
        {total}
      </ResultCount>
      <TheResult
        x={centerX + (centeredMetricStyle?.labelStyle?.x ?? 0)}
        y={centerY + (centeredMetricStyle?.labelStyle?.y ?? 20)}
        textAnchor="middle"
        dominantBaseline="central"
        style={centeredMetricStyle?.labelStyle?.css}
      >
        all result
      </TheResult>
    </>
  );
};

const TheResult = styled.text`
  font-size: 16px;
  font-weight: 400;
  margin: 54px 0 0;
  fill: ${({ theme }) => theme.text.lowContrast};
`;

const ResultCount = styled.text`
  font-size: 48px;
  margin: 0 0 14px;
  font-weight: bold;
`;

export default CenteredMetric;
