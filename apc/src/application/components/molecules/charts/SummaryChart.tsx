import React, { FC, CSSProperties } from 'react';

import { Pie } from '@nivo/pie';
import styled from 'styled-components';

import { getThemes } from '$application/theme/getThemes';

import { IData, IPartialMargin } from './nivoCommonTypes';
import CenteredMetric from './SummaryChart/CenteredMetric';
import Legends from './SummaryChart/Legends';

export interface CentricMetricStyle {
  countStyle?: { x?: number; y?: number; css?: CSSProperties };
  labelStyle?: { x?: number; y?: number; css?: CSSProperties };
}

export interface RadiusOffset {
  inner: number;
  outer: number;
}

export interface SummaryChartProps {
  data: IData[];
  chartWidth: number;
  chartHeight: number;
  legendsDistanceWithChart: number;
  partialMargin: IPartialMargin;
  outerPartialMargin: IPartialMargin;
  legendsWithGrid?: boolean;
  centeredMetricStyle?: CentricMetricStyle;
  chartInnerRadius: number;
  activeRadiusOffset: RadiusOffset;
  vertical?: boolean;
}

export const SummaryChart: FC<SummaryChartProps> = ({
  data,
  chartWidth,
  chartHeight,
  legendsWithGrid = true,
  chartInnerRadius,
  partialMargin,
  outerPartialMargin,
  legendsDistanceWithChart,
  centeredMetricStyle,
  activeRadiusOffset,
  vertical,
}) => {
  const CenteredMetricWithStyle = ({ dataWithArc, centerX, centerY }) =>
    CenteredMetric({ dataWithArc, centerX, centerY, centeredMetricStyle });

  const theme = getThemes();

  return (
    <Grid $vertical={vertical}>
      <PieWrapper>
        <Pie
          width={chartWidth}
          height={chartHeight}
          data={data}
          margin={partialMargin}
          layers={['arcs', 'legends', CenteredMetricWithStyle]}
          innerRadius={chartInnerRadius}
          padAngle={1}
          activeOuterRadiusOffset={activeRadiusOffset.outer}
          activeInnerRadiusOffset={activeRadiusOffset.inner}
          borderWidth={0}
          colors={(d) => d.data.color}
          enableArcLinkLabels={false}
          enableArcLabels={false}
        />
        <Pie
          width={chartWidth + 20}
          height={chartHeight + 20}
          data={[
            {
              value: 100,
            },
          ]}
          margin={outerPartialMargin}
          layers={['arcs']}
          innerRadius={chartInnerRadius - 0.1}
          padAngle={1}
          borderWidth={0}
          colors={theme.LightBase.palette.primaryLight}
          borderColor={theme.LightBase.border}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          isInteractive={false}
        />
      </PieWrapper>
      <Legends
        data={data}
        withGrid={legendsWithGrid}
        marginLeft={legendsDistanceWithChart}
      />
    </Grid>
  );
};

const Grid = styled.div<{ $vertical?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
`;

const PieWrapper = styled.div`
  position: relative;
  & > div:nth-child(2) {
    position: absolute !important;
    z-index: -1;
    left: -15px;
    top: -15px;
  }
`;
