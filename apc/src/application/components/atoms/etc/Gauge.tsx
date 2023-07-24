import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';

export type GaugeVariants = 'Awaiting' | 'In Progress' | 'Pending' | 'Completed';

export interface GaugeProps {
  count: number;
  type: GaugeVariants;
  label: string;
  subtitle: string;
  color: string;
  icon: ReactNode;
}

export const Gauge: FC<GaugeProps> = ({ count, label, color, icon, subtitle }) => {
  return (
    <Container>
      <HeadingWrapper>
        <IconBox color={color}> {icon}</IconBox>
        <Title>{label}</Title>
      </HeadingWrapper>
      <Count>{count}</Count>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0 2px 6px 0 ${({ theme }) => theme.palette.primaryLight};
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface IconBoxProps {
  color: string;
}

const IconBox = styled.div<IconBoxProps>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  padding: 6px;
  box-sizing: border-box;
  background-color: ${({ color: variant }) => variant};
  & > svg {
    width: 24px;
    height: 24px;
    path,
    use {
      fill: ${({ theme }) => theme.background.primary};
    }
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 12px;
  line-height: 1.2;
  color: ${({ theme }) => theme.link.text};
`;

const Count = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.contrast.secondary};
  line-height: 1.28;
  margin-top: 12px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;
