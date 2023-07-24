import React, { FC } from 'react';

import styled from 'styled-components';

import InfoSVG from '$application/assets/icons/info.svg';

export const ErrorHint: FC = () => {
  return (
    <Container>
      <IconContainer>
        <InfoSVG />
      </IconContainer>
      <span>
        As the publisher of the journal is restricted, you cannot add the journal to this
        group
      </span>
    </Container>
  );
};

export default ErrorHint;

const Container = styled.div`
  display: flex;
  margin-top: 24px;
  color: ${({ theme }) => theme.palette.grey['700']};
`;

const IconContainer = styled.div`
  width: 20px;
  height: 16px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.negativeLight};
  & > svg path,
  use {
    fill: ${({ theme }) => theme.palette.negative};
  }
`;
