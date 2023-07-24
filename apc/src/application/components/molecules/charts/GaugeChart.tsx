import React, { FC } from 'react';

import { Pie } from '@nivo/pie';
import styled from 'styled-components';

import ChartTooltip from './GaugeChart/ChartTooltip';
import { GaugeChartData } from './GaugeChart/dataProcess';
import { IPartialMargin } from './nivoCommonTypes';

export interface GaugeChartProps {
  items: GaugeChartData;
  margin?: IPartialMargin;
  totalLabel?: string;
}

const defaultChartMargin = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

export const GaugeChart: FC<GaugeChartProps> = ({ items, margin, totalLabel }) => {
  return (
    <Container>
      <TotalCountWrapper>
        <TotalCount>{items.total}</TotalCount>
        <Label isBold={true}>{totalLabel ?? 'Total'}</Label>
      </TotalCountWrapper>
      {items.data.map((item, key) => {
        let percentage = (item[0].value * 100) / items.total;
        if (isNaN(percentage)) {
          percentage = 0;
        }
        return (
          <ChartAndLabelWrapper key={key}>
            <ChartWrapper>
              <Pie
                width={60}
                data={item}
                height={60}
                cornerRadius={0}
                innerRadius={0.8}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                colors={(d) => d.data.color}
                activeOuterRadiusOffset={1.5}
                margin={margin ?? defaultChartMargin}
                tooltip={(data) => <ChartTooltip data={data} />}
              />
            </ChartWrapper>
            <div>
              <Percentage>{Math.floor(percentage)}%</Percentage>
              <Label>{item[0].label}</Label>
            </div>
          </ChartAndLabelWrapper>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const TotalCountWrapper = styled.div`
  width: max-content;
  margin-right: 60px;
`;

const TotalCount = styled.div`
  font-size: 48px;
  line-height: 60px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const ChartAndLabelWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  width: max-content;
  margin-right: 70px;
`;

interface LabelProps {
  isBold?: boolean;
}

const Label = styled.div<LabelProps>`
  width: 100%;
  font-size: 16px;
  max-width: 81px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.contrast.primary};
  font-weight: ${({ isBold = false }) => isBold && 600};
  text-align: ${({ isBold = false }) => isBold && 'center'};
`;

const Percentage = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const ChartWrapper = styled.div`
  position: relative;
  & > div:nth-child(1) {
    margin-top: -15px;
    margin-left: -5px;
  }
`;
