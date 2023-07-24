import React, { useState } from 'react';

import { StoryFC } from '$application/components/StoryFC';
import { Currency } from '$service/doaj/types/Currency';

import { PriceInput, PriceInputProps } from './PriceInput';

export default {
  title: 'Molecules / PriceInput',
  component: PriceInput,
};

export const Default: StoryFC<PriceInputProps> = (args) => {
  const [value, setValue] = useState(args.value);
  const [currency, setCurrency] = useState(args.selectedCurrency);

  const onChange = (item: string) => {
    setValue(item);
    args.onChange(item);
  };

  const onSelect = (item: string) => {
    setCurrency(item);
    args.onSelect(item);
  };

  return (
    <PriceInput
      {...args}
      value={value}
      selectedCurrency={currency}
      onChange={onChange}
      onSelect={onSelect}
    />
  );
};

Default.args = {
  value: '0',
  label: 'Price',
  maxValue: 100,
  placeHolder: '0',
  selectedCurrency: Currency.USD,
};

Default.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac8034bcea484b4e393b3b',
};
