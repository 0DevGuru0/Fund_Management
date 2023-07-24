import React, { FC } from 'react';

import styled from 'styled-components';

// import BellSVG from '$application/assets/icons/bell-fill.svg';
// import { Search } from '$application/components/atoms/etc/Search';
import {
  Breadcrumb,
  IHistoryStep,
} from '$application/components/molecules/etc/Breadcrumb';

interface ManagementHeaderProps {
  breadcrumbs: IHistoryStep[];
}

export const ManagementHeader: FC<ManagementHeaderProps> = ({ breadcrumbs }) => {
  return (
    <Container>
      <LeftSection>
        <Breadcrumb items={breadcrumbs} />
      </LeftSection>
      {/* <RightContainer>
        <BellSVG />
        <Separator />
        <HeaderSearch
          onSearch={() => {
            return '';
          }}
        />
      </RightContainer> */}
    </Container>
  );
};

export default ManagementHeader;

const Container = styled.div`
  display: flex;
  padding: 9px 36px 9px 0;
  border-bottom: 1px ${({ theme }) => theme.palette.grey[400]} solid;
`;

const LeftSection = styled.div`
  flex: 1;
`;

// const RightContainer = styled.div`
//   display: flex;
//   padding: 10px 0;
//   > svg {
//     width: 28px;
//     height: 28px;
//     margin: auto 0;
//     & path,
//     & use {
//       fill: ${({ theme }) => theme.palette.grey[600]};
//     }
//   }
// `;

// const HeaderSearch = styled(Search)`
//   width: 260px;
// `;

// const Separator = styled.div`
//   height: 24px;
//   margin: 12px 24px;
//   border: 1px solid ${({ theme }) => theme.palette.primaryLight};
// `;
