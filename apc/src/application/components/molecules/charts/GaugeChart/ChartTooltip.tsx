import React, { FC, PropsWithChildren } from 'react';

import { PieTooltipProps } from '@nivo/pie';
import styled from 'styled-components';

import { IData } from '../nivoCommonTypes';

interface ChartTooltipProps {
  data: PropsWithChildren<PieTooltipProps<IData>>;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ data }) => {
  const tooltipValue = data.datum;

  // Do not show the tooltip when hovering not-filled section of the chart
  if (tooltipValue.id === 'Others') return null;

  return (
    <Container>
      <Text>
        {tooltipValue.label}: <b>{tooltipValue.value}</b>
      </Text>
    </Container>
  );
};

export default ChartTooltip;

const Container = styled.div`
  padding: 5px;
  display: flex;
  font-size: 12px;
  width: max-content;
  border-radius: 6px;
  background: ${({ theme }) => theme.text.contrast.secondary};
`;

const Text = styled.div`
  width: max-content;
  color: ${({ theme }) => theme.background.primary};
`;
