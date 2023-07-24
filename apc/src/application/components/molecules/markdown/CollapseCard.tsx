import React, { FC, useState } from 'react';

import gsap from 'gsap';
import styled from 'styled-components';

import Minus from '$application/assets/icons/minus.svg';
import Plus from '$application/assets/icons/plus.svg';
import Feedback, { FeedbackType } from '$application/components/atoms/etc/Feedback';
import { AnimationWrapper } from '$application/lib/animation/AnimationWrapper';

export interface CollapseCardProps {
  title: string;
  open?: boolean;
  children?: React.ReactNode;
}

const CollapseCard: FC<CollapseCardProps> = ({ title, children, open = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType>('neutral');

  const animation = (element) => gsap.from(element, { opacity: 0 });

  return (
    <Container>
      <Icon onClick={() => setIsOpen(!isOpen)}>{isOpen ? <Minus /> : <Plus />}</Icon>
      <Content>
        <Header onClick={() => setIsOpen(!isOpen)}>{title}</Header>
        {isOpen && (
          <AnimationWrapper gsapHandler={animation}>
            {children}
            <Feedback
              selectedFeedback={selectedFeedback}
              onSelect={setSelectedFeedback}
            />
          </AnimationWrapper>
        )}
      </Content>
    </Container>
  );
};

export default CollapseCard;

const Container = styled.div`
  gap: 24px;
  display: flex;
  padding: 24px;
  padding-right: 36px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;

const Header = styled.div`
  padding: 8px 0;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Icon = styled.div`
  width: 24px;
  padding: 6px;
  height: 24px;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  svg {
    width: 24px;
    height: 24px;
    use,
    path {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }
`;

const Content = styled.div`
  flex: 1;
`;
