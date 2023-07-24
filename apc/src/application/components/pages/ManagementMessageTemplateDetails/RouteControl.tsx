import React from 'react';

import Link from 'next/link';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';

export const RouteControl = () => (
  <Link href="/management/message-templates">
    <IconButton
      color="Primary"
      variant="WithText"
      icon={<ArrowSVG />}
      title="Back to Message Templates"
    />
  </Link>
);

export default RouteControl;
