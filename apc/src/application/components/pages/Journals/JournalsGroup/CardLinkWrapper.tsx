import React, { FC } from 'react';

import { useUpdateAtom } from 'jotai/utils';
import Link from 'next/link';

import { currentPageAtom } from '$application/components/pages/JournalGroupDetails/store';
import { getUserRole } from '$application/utils/userRole';

export interface CardLinkWrapperProps {
  groupId: string;
}

const CardLinkWrapper: FC<CardLinkWrapperProps> = ({ children, groupId }) => {
  const setCurrentPage = useUpdateAtom(currentPageAtom);
  const { role } = getUserRole();
  let href = `/fundManager/journal-group/${groupId}`;

  if (role === 'SystemAdmin') {
    href = `/management/journal-group/${groupId}`;
  }

  return (
    <Link href={href}>
      <div onClick={() => setCurrentPage(1)}>{children}</div>
    </Link>
  );
};

export default CardLinkWrapper;
