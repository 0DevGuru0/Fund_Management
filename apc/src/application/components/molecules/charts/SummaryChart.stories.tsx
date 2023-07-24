import React from 'react';

import { rest } from 'msw';
import styled from 'styled-components';

import { Message, ServiceStatus } from '$application/components/atoms/etc/Message';
import { StoryFC } from '$application/components/StoryFC';
import { useMockRequest } from '$application/utils/msw/useMockRequest';

import { SummaryChart, SummaryChartProps } from './SummaryChart';
import { processSummaryChartData, SummaryApiResponse } from './SummaryChart/dataProcess';

export default {
  title: 'Molecules / Charts / SummaryChart',
  component: SummaryChart,
};

const mockServiceAddress = 'https://sample.com/api/summary/';
const mockedRequest = [
  rest.get(`${mockServiceAddress}`, (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        results: processedData,
      }),
    );
  }),
];

const sampleApiResults: SummaryApiResponse[] = [
  { label: 'To Do', count: 12 },
  { label: 'Returned', count: 3 },
  { label: 'Rejected', count: 5 },
  { label: 'In Progress', count: 16 },
  { label: 'Pending', count: 1 },
  { label: 'Completed', count: 378 },
];

const processedData = processSummaryChartData(sampleApiResults);

export const SummaryChartComponentWithGrid: StoryFC<SummaryChartProps> = (args) => {
  const { status, data, error } = useMockRequest(mockServiceAddress);

  if (status === ServiceStatus.Loading) {
    return <Message status={status} message="Fetching items ..." />;
  }

  if (status === ServiceStatus.Error && error) {
    return <Message status={status} message={error.message} />;
  }

  return (
    <CenteredWrapper>
      <SummaryChart {...args} data={data} />
    </CenteredWrapper>
  );
};

SummaryChartComponentWithGrid.args = {
  data: processedData,
  chartInnerRadius: 0.9,
  centeredMetricStyle: {
    countStyle: {
      css: {
        fontSize: '36px',
        lineHeight: '1.28',
        letterSpacing: '0',
        margin: '0 0 12px',
        padding: '14px 1px 20px 93px',
      },
    },
    labelStyle: {
      css: {
        margin: '40px 0 0',
        fontSize: '14px',
        fontWeight: 400,
      },
    },
  },
  chartWidth: 165,
  chartHeight: 165,
  partialMargin: { top: 5, right: 35, bottom: 0, left: 20 },
  activeRadiusOffset: {
    inner: 3,
    outer: 3,
  },
  legendsWithGrid: true,
  outerPartialMargin: {
    left: 32,
    top: 20,
    right: 37,
    bottom: 5,
  },
  legendsDistanceWithChart: 35,
};

export const SummaryChartComponent = SummaryChartComponentWithGrid.bind({});

SummaryChartComponent.args = {
  data: processedData,
  chartInnerRadius: 0.95,
  chartWidth: 250,
  chartHeight: 250,
  partialMargin: { top: 0, right: 20, bottom: 0, left: 20 },
  legendsWithGrid: false,
  legendsDistanceWithChart: 105,
  centeredMetricStyle: {
    labelStyle: {
      y: 25,
    },
  },
  activeRadiusOffset: {
    inner: 6,
    outer: 5,
  },
  outerPartialMargin: {
    left: 30,
    top: 10,
    right: 20,
    bottom: 0,
  },
};

SummaryChartComponentWithGrid.parameters = {
  zeplinLink: [
    {
      name: 'Summary Chart (System Admin / Inbox)',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c946774b7215756f0312',
    },
    {
      name: 'Summary Chart (Fund Manager / Inbox)',
      link:
        'https://app.zeplin.io/project/607d3344d1f15399bad881fa/screen/60d2dac82b986310ab271603',
    },
  ],
  msw: mockedRequest,
};

SummaryChartComponent.parameters = {
  zeplinLink: [
    {
      name: 'Summary Chart (System Admin / Dashboard)',
      link:
        'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6087d6fabe7d62a17726170b',
    },
    {
      name: 'Summary Chart (Fund Manager / Dashboard)',
      link:
        'https://app.zeplin.io/project/607d3344d1f15399bad881fa/screen/60d2da9837bc2617a3db8ba6',
    },
  ],
  msw: mockedRequest,
};

const CenteredWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
