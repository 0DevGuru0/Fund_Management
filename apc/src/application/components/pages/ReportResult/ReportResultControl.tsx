import React, { FC, useEffect } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import Logo from '$application/assets/Logo.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import { useGetFundApplicationsReport } from '$application/lib/generated/apcApi';

export interface ReportResultControlProps {
  fundIds?: string;
  affiliationIds?: string;
  publisherIds?: string;
  journalIds?: string;
  policyIds?: string;
  states?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export const ReportResultControl: FC<ReportResultControlProps> = ({
  fundIds,
  affiliationIds,
  publisherIds,
  journalIds,
  states,
  startDate,
  endDate,
  type,
}) => {
  const reportCreator = useGetFundApplicationsReport(
    {
      affiliationIds,
      endDate,
      fundIds,
      journalIds,
      publisherIds,
      startDate,
      states,
      policyType: type,
    },
    {
      query: {
        enabled: false,
      },
    },
  );

  useEffect(() => {
    return () => {
      if (reportCreator.isFetched) {
        reportCreator.remove();
      }
    };
  });

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>

      <ControlContainer>
        <Link href={reportCreator.data ? reportCreator.data : '#'}>
          <Button
            isLoading={reportCreator.isFetching}
            leftIcon="xls-file"
            customSize="lg"
            title={reportCreator.data ? 'Download' : 'Export'}
            variant="outlined"
            color="secondary"
            onClick={() => {
              if (!reportCreator.data) {
                reportCreator.refetch();
              }
            }}
          />
        </Link>
      </ControlContainer>
    </Container>
  );
};
export default ReportResultControl;

const Container = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
  button {
    background-color: ${({ theme }) => theme.palette.secondary};
    border: inherit;
  }
`;

const LogoContainer = styled.div`
  > svg {
    width: 140px;
    height: 41px;
  }
`;

const ControlContainer = styled.div``;
