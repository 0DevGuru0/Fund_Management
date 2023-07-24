// import React from 'react';

// import WaffleSVG from '$application/assets/icons/waffle.svg';
import { css } from 'styled-components';

import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { taskToColor } from '$application/lib/taskToColor';

// import JournalFilter from './journalGroupsFiltersConfig/JournalFilter';

export const journalGroupsFiltersConfig: FilterConfig = {
  // inputs: [
  // {
  //   label: 'Journal',
  //   name: 'journal',
  //   disabled: true,
  //   multiSelect: true,
  //   rendererComponent: JournalFilter,
  // },
  // {
  //   label: 'Date',
  //   name: 'date',
  //   disabled: true, // TODO: We can enable it when we have implemented DatePicker
  //   startAdornment: <WaffleSVG />,
  // },
  // ],
  checkboxes: [
    {
      name: 'states',
      label: 'States',
      checkboxes: [
        {
          label: 'Active',
          name: 'active',
          indicatorColor: taskToColor.Active,
        },
        {
          label: 'Suspended',
          name: 'suspended',
          indicatorColor: taskToColor.Suspended,
        },
        {
          name: 'onlyRestricted',
          label: 'Only Restricted',
          style: css`
            right: 0;
            position: absolute;
          `,
        },
      ],
    },
  ],
};
