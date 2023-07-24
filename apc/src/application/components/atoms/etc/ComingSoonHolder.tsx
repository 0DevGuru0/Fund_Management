import React, { FC, ReactNode } from 'react';

import { rgba } from 'polished';
import styled from 'styled-components';

export interface ComingSoonHolderProps {
  description: string;
  actionButton?: ReactNode;
}

export const ComingSoonHolder: FC<ComingSoonHolderProps> = ({
  description,
  // actionButton,
}) => {
  return (
    <Container>
      <Title>Coming Soon</Title>
      <Description>{description}</Description>
      {/* {actionButton} */}
    </Container>
  );
};

export default ComingSoonHolder;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: 120px;
  font-weight: bold;
  line-height: 1.27;
  letter-spacing: -3px;
  margin-bottom: 12px;
  background: linear-gradient(
    to right,
    ${({ theme }) => rgba(theme.palette.primary, 0.5)},
    ${({ theme }) => rgba(theme.palette.secondary, 0.5)}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.div`
  font-size: 16px;
  max-width: 500px;
  text-align: center;
  letter-spacing: -0.1px;
  line-height: 1.75;
  margin: 24px 0;
  color: ${({ theme }) => theme.text.contrast.primary};
`;
