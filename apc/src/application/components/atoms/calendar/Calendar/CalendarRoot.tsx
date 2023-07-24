import React from 'react';

import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export const CalendarRoot = ({ children }) => {
  return <MuiPickersUtilsProvider utils={DayjsUtils}>{children}</MuiPickersUtilsProvider>;
};
