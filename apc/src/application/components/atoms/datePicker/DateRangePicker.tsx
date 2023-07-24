/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';

import clsx from 'classnames';
import 'react-dates/initialize';
import { isEmpty } from 'lodash';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { ArrowIcon, WaffleIcon } from './DateRangePicker/icons';
import Wrapper from './DateRangePicker/Wrapper';

export interface IDateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangeProps {
  className?: string;
  endDatePlaceHolder?: string;
  startDatePlaceholder?: string;
  onSelect: (value: IDateRange) => void;
}

export const DateRange: FC<DateRangeProps> = ({
  onSelect,
  className,
  endDatePlaceHolder = 'To',
  startDatePlaceholder = 'From',
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: null,
  });

  const isFilled = !isEmpty(dateRange.startDate) && !isEmpty(dateRange.endDate);

  useEffect(() => {
    if (isFilled) {
      onSelect(dateRange);
    }
  }, [dateRange]);

  return (
    <Wrapper
      isFilled={isFilled}
      isFocused={!!focusedInput}
      className={clsx('DateRangePicker', className)}
    >
      <DateRangePicker
        noBorder
        readOnly
        endDateId="endDate"
        startDateId="startDate"
        hideKeyboardShortcutsPanel
        displayFormat="DD MMM YYYY"
        focusedInput={focusedInput}
        endDate={dateRange.endDate}
        onDatesChange={setDateRange}
        onFocusChange={setFocusedInput}
        customArrowIcon={<ArrowIcon />}
        startDate={dateRange.startDate}
        customInputIcon={<WaffleIcon />}
        endDatePlaceholderText={endDatePlaceHolder}
        startDatePlaceholderText={startDatePlaceholder}
      />
    </Wrapper>
  );
};

export default DateRange;
