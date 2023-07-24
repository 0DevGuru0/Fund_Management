import React, { FC } from 'react';

import { PageCountBox, PaginationWithCount } from '@iin/pubnito-components';
import { first, last } from 'lodash';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  customStyle?: FlattenSimpleInterpolation;
}

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onPageChange,
  pageSize,
  customStyle,
}) => {
  const pages = Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => i + 1);

  const nextPageHandler = () => {
    if (currentPage < pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPage > pages[0]) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <Wrapper customStyle={customStyle}>
      <PaginationWithCount
        nextPageHandler={nextPageHandler}
        prevPageHandler={prevPageHandler}
        hasNextPage={currentPage !== last(pages)}
        hasPrevPage={currentPage !== first(pages)}
        nextButtonText="Next"
        prevButtonText="Prev"
      >
        <PageCountBox
          pages={pages}
          currentPage={currentPage}
          clickOnPageCount={onPageChange}
        />
      </PaginationWithCount>
    </Wrapper>
  );
};

interface IWrapper {
  customStyle?: FlattenSimpleInterpolation;
}

const Wrapper = styled.div<IWrapper>`
  & > div {
    background-color: unset;
  }

  .MuiButton-root.Mui-disabled {
    span {
      p {
        color: ${({ theme }) => theme.palette.grey[700]};
      }
      svg {
        fill: ${({ theme }) => theme.palette.grey[700]};
      }
    }
  }

  .PubActivePage p {
    color: #000;
  }

  button:hover p {
    color: ${({ theme }) => theme.palette.grey[700]};
  }

  ${({ customStyle }) => customStyle}
`;

export default Pagination;
