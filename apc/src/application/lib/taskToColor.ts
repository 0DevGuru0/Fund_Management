/* eslint-disable @typescript-eslint/naming-convention */
import { getThemes } from '$application/theme/getThemes';

const theme = getThemes().LightBase;

export enum TaskNameNormalizer {
  ACTIVE = 'Active',
  UNKNOWN = 'Unknown',
  COMPLETED = 'Completed',
  SUSPENDED = 'Suspended',
  EXTERNALLY_TERMINATED = 'Externally Terminated',
  INTERNALLY_TERMINATED = 'Internally Terminated',
  AVAILABLE = 'Available',
  RESERVED = 'Reserved',
  ALLOCATED = 'Allocated',
}

export const taskToColor = {
  // ----- Inbox -----
  'In Progress': theme.taskPalette.yellow,
  Completed: theme.taskPalette.green,
  Rejected: theme.taskPalette.red,
  Returned: theme.taskPalette.purple,
  Awaiting: theme.taskPalette.grey,
  'To Do': theme.taskPalette.grey,
  Pending: theme.taskPalette.orange,
  // ----- Overview -----
  'Upload Acceptance Letter': theme.taskPalette.yellow,
  'Process Payment': theme.taskPalette.blue,
  'Approve Invoice': theme.taskPalette.red,
  'Upload Journal Invoice': theme.taskPalette.orange,
  'Voucher Approve': theme.taskPalette.green,
  'Pre Approve Invoice Payment': theme.taskPalette.purple,
  // ----- Journals, Request Details -----
  Unknown: theme.taskPalette.grey,
  Active: theme.taskPalette.green,
  Suspended: theme.taskPalette.red,
  // Policy vouchers
  Reserved: theme.taskPalette.yellow,
  Available: theme.taskPalette.green,
  Allocated: theme.taskPalette.grey,
};
