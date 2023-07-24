import { SummaryChartProps } from '$application/components/molecules/charts/SummaryChart';

export const summaryChartProps: Omit<SummaryChartProps, 'data'> = {
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
        fontWeight: 'bold',
      },
    },
  },
  outerPartialMargin: {
    left: 32,
    top: 20,
    right: 37,
    bottom: 5,
  },
  activeRadiusOffset: {
    inner: 3,
    outer: 3,
  },
  partialMargin: { top: 5, right: 35, bottom: 0, left: 20 },
  chartInnerRadius: 0.82,
  chartWidth: 165,
  chartHeight: 165,
  legendsWithGrid: true,
  legendsDistanceWithChart: 35,
};
