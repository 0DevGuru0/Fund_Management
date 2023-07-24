import React, { FC } from 'react';

import styled from 'styled-components';

export interface NameValueProps {
  name: string;
  value?: string;
}

export const InfoNameValue: FC<NameValueProps> = ({ name, children, value = '-' }) => {
  return (
    <Container>
      <InfoKeyP>{name}</InfoKeyP>
      {children ?? <InfoValueP $value={value}>{value}</InfoValueP>}
    </Container>
  );
};

export default InfoNameValue;

const Container = styled.div`
  height: 50px;
  display: flex;
  margin-bottom: 36px;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoKeyP = styled.p`
  margin: 0;
  height: 18px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

interface ContainerProps {
  $value?: string;
}

const InfoValueP = styled.p<ContainerProps>`
  height: 20px;
  font-size: 16px;
  margin: 12px 0 0;
  font-weight: ${({ $value }) => ($value ? 600 : 0)};
  color: ${({ $value, theme }) =>
    $value ? theme.text.contrast.secondary : theme.palette.grey[800]};
`;
