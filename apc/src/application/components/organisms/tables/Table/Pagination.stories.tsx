import React, { FC, useState } from 'react';

import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Organisms / Table / Pagination',
  component: Pagination,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6087d7017d906d115cd880eb',
  },
};

export const PaginationCmp: FC<PaginationProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      pageSize={5}
      totalCount={60}
    />
  );
};
