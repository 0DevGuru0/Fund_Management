import React, { FC } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { getUserRole } from '$application/utils/userRole';

const BackLink: FC = () => {
  const { role } = getUserRole();
  let href = '/fundManager/inbox';
  let title = 'Back to Inbox';

  if (role === 'FundFinancialManager') {
    href = '/fundFinancialManager/inbox';
  }
  if (role === 'SystemAdmin') {
    href = '/management/allTask';
    title = 'Back to All Tasks';
  }
  if (role === 'Researcher') {
    href = '/researcher/overview';
    title = 'Back to Overview';
  }
  return (
    <Link href={href}>
      <Container>
        <IconButton
          color="Primary"
          variant="WithText"
          icon={<ArrowSVG />}
          title={title}
        />
      </Container>
    </Link>
  );
};

export default BackLink;

const Container = styled.div`
  margin-top: 24px;
  margin-left: 35px;
`;
