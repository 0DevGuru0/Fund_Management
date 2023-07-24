import { IChipInput } from '@iin/pubnito-components';

import { StoryFC } from '$application/components/StoryFC';

import CustomChipInput from './CustomChipInput';

export default {
  title: 'Atoms / Controls / CustomChipInput',
  component: CustomChipInput,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
  },
};

export const Default: StoryFC<IChipInput> = CustomChipInput;

Default.args = {
  title: 'Simple Chip Input',
  iconButtonProps: {
    tooltipTitle: 'Add',
    disabledText: 'this item exists and can not be added again',
  },
  addTagInBottom: true,
};
