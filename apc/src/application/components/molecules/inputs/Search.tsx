import React, { FC, useState } from 'react';

import clsx from 'classnames';
import { debounce } from 'debounce';
import { pick } from 'lodash';

import ClearSVG from '$application/assets/icons/close-fill.svg';
import SearchSVG from '$application/assets/icons/search.svg';
import Input, { InputProps } from '$application/components/atoms/etc/Input';

export type SearchProps = Omit<InputProps, 'disabled' | 'value' | 'startAdornment'> & {
  delay?: number;
  startAdornment?: boolean;
};

export const Search: FC<SearchProps> = (props) => {
  const [value, setValue] = useState('');

  const delayedSubmit = (newValue: string) => {
    setValue(newValue);
    debounce(props.onChange(newValue.trim()), props.delay ?? 300);
  };

  const startAdornment = (hover, typingMode, isFilledMode) =>
    typingMode || (hover && isFilledMode) ? (
      <ClearSVG onClick={() => delayedSubmit('')} />
    ) : (
      <SearchSVG />
    );

  return (
    <Input
      value={value}
      onChange={delayedSubmit}
      className={clsx('Search', props.className)}
      {...pick(props, ['errorText', 'placeholder', 'label'])}
      startAdornment={!props.startAdornment ? startAdornment : undefined}
    />
  );
};
