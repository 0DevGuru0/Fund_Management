import React, { FC } from 'react';

import styled from 'styled-components';

import ThumbsDownFill from '$application/assets/icons/thumbs-down-fill.svg';
import ThumbsDown from '$application/assets/icons/thumbs-down.svg';
import ThumbsUpFill from '$application/assets/icons/thumbs-up-fill.svg';
import ThumbsUp from '$application/assets/icons/thumbs-up.svg';

export type FeedbackType = 'up' | 'down' | 'neutral';

export interface FeedbackProps {
  selectedFeedback: FeedbackType;
  onSelect: (newFeedback: FeedbackType) => void;
}

const Feedback: FC<FeedbackProps> = ({ selectedFeedback, onSelect }) => {
  return (
    <Container>
      <Text>Was this useful?</Text>
      <FeedbackContainer
        onClick={() => onSelect(selectedFeedback === 'up' ? 'neutral' : 'up')}
      >
        {selectedFeedback === 'up' ? <ThumbsUpFill /> : <ThumbsUp />}
        <span>Yes</span>
      </FeedbackContainer>
      <FeedbackContainer
        onClick={() => onSelect(selectedFeedback === 'down' ? 'neutral' : 'down')}
      >
        {selectedFeedback === 'down' ? <ThumbsDownFill /> : <ThumbsDown />}
        <span>No</span>
      </FeedbackContainer>
    </Container>
  );
};

export default Feedback;

const Container = styled.div`
  display: flex;
  font-size: 16px;
  margin-top: 24px;
  color: ${({ theme }) => theme.palette.grey[700]};
  svg {
    width: 20px;
    height: 20px;
    margin-right: 3px;
    use,
    path {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }
`;

const Text = styled.div`
  margin: auto 0;
  margin-right: 24px;
`;

const FeedbackContainer = styled.div`
  cursor: pointer;
  margin-right: 12px;
`;
