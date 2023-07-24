import React, { FC, useEffect, useRef, useState } from 'react';

import { debounce, DebouncedFunc, isEmpty } from 'lodash';

import PriceInput from '$application/components/molecules/etc/PriceInput';
import { RenderComponent } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import { Currency } from '$service/doaj/types/Currency';

export const MaxApcFilter: FC<RenderComponent> = ({ input, filterHandler }) => {
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const debounceRef = useRef<DebouncedFunc<() => void>>();

  const onChangeInput = (item: string) => {
    setValue(item);
  };

  const onSelectCurrency = (item: string) => {
    const abbreviatedCurrencyName = Object.keys(Currency).find(
      (key) => Currency[key] === item,
    );
    setCurrency(abbreviatedCurrencyName!);
  };

  useEffect(() => {
    delayedFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, currency]);

  const delayedFilterChange = () => {
    if (!isEmpty(value)) {
      const processedValue = { name: input.name, value, id: currency };
      const newSubmission = debounce(filterHandler, 1000);
      debounceRef.current = newSubmission;
      newSubmission(processedValue);
    }
  };

  return (
    <PriceInput
      fullWidth
      disabled={true} // TODO: temporarily disabled due to unavailable data for APC and Currency
      delay={300}
      value={value}
      label="Max APC"
      placeHolder="0"
      onChange={onChangeInput}
      onSelect={onSelectCurrency}
      selectedCurrency={currency}
    />
  );
};

export default MaxApcFilter;
