import { SummaryChartProps } from '$application/components/molecules/charts/SummaryChart';
import { Definition } from '$application/components/organisms/tables/Table';
import { TaskState } from '$application/components/organisms/tables/Table/CornerColumn/TaskState';
import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import CommonText, {
  TextType,
} from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { PolicyTitle } from '$application/components/templates/Policies/PolicyTitle';
import { taskToColor } from '$application/lib/taskToColor';

export interface VoucherDetailItemType {
  code: {
    id: string;
    index?: number;
  };
  startDate: {
    text: string;
    textType: TextType;
  };
  expiryDate: {
    text: string;
    textType: TextType;
  };
  publisher: {
    text: string;
    textType: TextType;
  };
  state: {
    label: keyof typeof taskToColor;
    updateDate?: string;
  };
}

export const vouchersPerPage = 10;

export const voucherTableDefinitions: Definition[] = [
  { width: '250px', column: 'code', label: 'Code', renderer: PolicyTitle },
  { width: '85px', column: 'startDate', label: 'Start Date', renderer: CommonText },
  { width: '85px', column: 'expiryDate', label: 'Expiry Date', renderer: CommonText },
  { width: '250px', column: 'publisher', label: 'Publisher', renderer: CommonText },
  { width: '120px', column: 'state', label: 'State', renderer: TaskState },
];

export const voucherFiltersConfig: FilterConfig = {
  checkboxes: [
    {
      name: 'states',
      label: 'States',
      checkboxes: [
        {
          label: 'Available',
          name: 'AVAILABLE',
          indicatorColor: taskToColor.Active,
        },
        {
          label: 'Suspended',
          name: 'SUSPENDED',
          indicatorColor: taskToColor.Suspended,
        },
        {
          label: 'Reserved',
          name: 'RESERVED',
          indicatorColor: taskToColor['In Progress'],
        },
        {
          label: 'Allocated',
          name: 'ALLOCATED',
          indicatorColor: taskToColor.Unknown,
        },
      ],
    },
  ],
};

export const vouchersChartConfig: Omit<SummaryChartProps, 'data'> = {
  vertical: true,
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
  legendsWithGrid: false,
  outerPartialMargin: {
    left: 32,
    top: 20,
    right: 37,
    bottom: 5,
  },
  legendsDistanceWithChart: 35,
};
