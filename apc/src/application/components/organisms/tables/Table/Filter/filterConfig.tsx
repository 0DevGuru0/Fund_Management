import { map } from 'lodash';

import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { ToggleItem } from '$application/components/organisms/tables/Table/ToggleSelect';
import { taskToColor } from '$application/lib/taskToColor';

export const toggleItems: ToggleItem[] = [
  { title: 'Hamid', innerItem: 'https://github.com/hamidfzm.png' },
  { title: 'Ali', innerItem: 'https://github.com/alitourani.png' },
  { title: 'HamidReza', innerItem: 'https://github.com/hrkhosravi.png' },
  { title: 'Sajjad', innerItem: 'https://github.com/afsan007.png' },
  { title: 'Hossein', innerItem: 'https://github.com/HosseinAgha.png' },
  { title: 'Moein' },
];

export const sampleFilterConfig: FilterConfig = {
  inputs: [
    {
      label: 'Process',
      name: 'process',
      multiSelect: true,
      items: ['Article Processing Charge', 'Promotion Committee', 'Other Processes'],
    },
    {
      label: 'Assignee',
      name: 'toggle',
      multiSelect: true,
      items: map(toggleItems, 'title'),
    },
  ],
  checkboxes: [
    {
      name: 'states',
      label: 'States',
      checkboxes: [
        {
          label: 'Completed',
          name: 'completed',
          indicatorColor: taskToColor.Completed,
        },
        {
          label: 'Pending',
          name: 'pending',
          indicatorColor: taskToColor.Pending,
        },
      ],
    },
  ],
};
