import { SimpleTitle } from '$application/components/organisms/tables/Table/CornerColumn/SimpleTitle';
import { TaskState } from '$application/components/organisms/tables/Table/CornerColumn/TaskState';
import CommonText from '$application/components/organisms/tables/Table/InnerTable/CommonText';

export const overviewTableDefinition = [
  {
    width: '449px',
    column: 'article',
    label: 'Article',
    renderer: SimpleTitle,
  },
  {
    width: '256px',
    column: 'currentTask',
    label: 'Current task',
    renderer: CommonText,
  },
  {
    width: '256px',
    column: 'voucher',
    label: 'Voucher',
    renderer: CommonText,
  },
  {
    width: '175px',
    column: 'publisher',
    label: 'Publisher',
    renderer: CommonText,
  },
  {
    width: '215px',
    column: 'journal',
    label: 'Journal',
    renderer: CommonText,
  },
  {
    width: 'max-content',
    column: 'price',
    label: 'Price',
    renderer: CommonText,
  },

  {
    width: '274px',
    column: 'state',
    label: 'State',
    renderer: TaskState,
  },
];
