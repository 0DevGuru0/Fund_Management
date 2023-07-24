import React, { FC } from 'react';

import Link from 'next/link';

export interface TaskRouteWrapperProps {
  $processId?: string | null;
}

export const TaskRouteWrapper: FC<TaskRouteWrapperProps> = ({ children, $processId }) => {
  return $processId ? (
    <Link href={`/researcher/process/${$processId}`}>{children}</Link>
  ) : (
    <>{children}</>
  );
};

export default TaskRouteWrapper;
