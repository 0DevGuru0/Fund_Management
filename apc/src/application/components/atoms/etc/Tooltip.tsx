import React, { FC } from 'react';

import MuiTooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

export const Tooltip: FC<TooltipProps> = (props) => (
  <TooltipMui {...props}>{props.children}</TooltipMui>
);

const TooltipMui = withStyles({
  popper: {
    zIndex: 1000,
  },
  tooltip: {
    backgroundColor: 'black',
    fontSize: '12px',
  },
  arrow: {
    color: 'black',
  },
})(MuiTooltip);

export default Tooltip;
