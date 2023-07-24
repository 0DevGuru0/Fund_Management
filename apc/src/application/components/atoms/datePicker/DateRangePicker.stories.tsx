import React from 'react';

import { StoryFC } from '$application/components/StoryFC';

import { DateRange, DateRangeProps } from './DateRangePicker';

export default {
  title: 'Atoms / DateRangePicker',
  component: DateRange,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac806418edbb04cf1593e5',
  },
};

export const DateRangePicker: StoryFC<DateRangeProps> = (args) => {
  return <DateRange {...args} />;
};

DateRangePicker.args = {
  startDatePlaceholder: 'From',
  endDatePlaceHolder: 'To',
};
