import React from 'react';

import styled from 'styled-components';

import CheckSVG from '$application/assets/icons/check.svg';
import ClockSVG from '$application/assets/icons/clock.svg';
import SlashSVG from '$application/assets/icons/slash.svg';

import { IconWrapper, Text } from '../sharedStyled';

import { VoucherStatus } from '.prisma/backend-client';

const sharedProcess = (state: string, user: string) => (
  <Text>
    <CheckIconWrapper $size="20">
      <CheckSVG />
    </CheckIconWrapper>
    <GreenText>{state}</GreenText>
    <GrayText>for article by </GrayText>
    <DarkText>{user}</DarkText>
  </Text>
);
const CheckIconWrapper = styled(IconWrapper)`
  svg {
    use,
    path {
      fill: ${({ theme }) => theme.palette.secondaryMiddle};
    }
  }
`;
interface Props {
  status: VoucherStatus;
  user: string;
}

export const Process = ({ status, user }: Props) => {
  switch (status) {
    case 'ALLOCATED':
      return sharedProcess('Allocated', user);
    case 'RESERVED':
      return sharedProcess('Reserved', user);
    case 'AVAILABLE':
      return (
        <Text>
          <StyledIconWrapper $size="20">
            <ClockSVG />
          </StyledIconWrapper>
          <Status>Awaiting for use</Status>
        </Text>
      );
    case 'SUSPENDED':
      return (
        <Text>
          <StyledIconWrapper $size="20">
            <SlashSVG />
          </StyledIconWrapper>
          <GrayText style={{ marginLeft: '6px' }}>Suspended by {user}</GrayText>
        </Text>
      );
    default:
      return <>Loading...</>;
  }
};

const Status = styled.span`
  margin-left: 6px;
  color: ${({ theme }) => theme.palette.grey['700']};
`;
const GreenText = styled.span`
  color: ${({ theme }) => theme.palette.secondaryMiddle};
  font-weight: bold;
  margin-right: 3px;
  margin-left: 6px;
`;
const GrayText = styled.span`
  color: ${({ theme }) => theme.palette.grey['800']};
  margin-right: 3px;
`;

const DarkText = styled.span`
  color: black;
`;

const StyledIconWrapper = styled(IconWrapper)`
  svg {
    use,
    path {
      fill: ${({ theme }) => theme.palette.grey['700']};
    }
  }
`;

export default Process;
