import React, { useState } from 'react';

import { StoryFC } from '$application/components/StoryFC';

import Feedback, { FeedbackProps, FeedbackType } from './Feedback';

export default {
  title: 'Atoms / Feedback',
  component: Feedback,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fe088b96f0bdb58fe811',
  },
};

export const FeedbackCmp: StoryFC<FeedbackProps> = (args) => {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType>(
    args.selectedFeedback,
  );

  return (
    <Feedback
      {...args}
      onSelect={setSelectedFeedback}
      selectedFeedback={selectedFeedback}
    />
  );
};

FeedbackCmp.args = {
  selectedFeedback: 'neutral',
};
