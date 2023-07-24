import React, { FC, RefObject, useState } from 'react';

import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import styled from 'styled-components';

import { CalendarProps } from '../Calendar';

import { CalendarRoot } from './CalendarRoot';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

// TODO: to make this reusable we should use date-io here and require our users to add CalenderRoot themselves (With their preferred date lib)
export interface CoreCalendarProps extends CalendarProps {
  rightButtonRef: RefObject<HTMLButtonElement>;
  leftButtonRef: RefObject<HTMLButtonElement>;
}

export const CalendarCore: FC<CoreCalendarProps> = ({
  deadlines = [],
  rightButtonRef,
  leftButtonRef,
  onChange,
  filteredDay,
}) => {
  const [datePickerValue, setDatePickerValue] = useState<Date | undefined>(new Date());
  const dayDeadlines = deadlines.map((el) => dayjs(el));
  const onDateChange = (date: MaterialUiPickersDate) => {
    onChange(date);
    setDatePickerValue(date?.toDate());
  };

  const dayRenderer = (
    day: Dayjs | null,
    selectedDate: any,
    isInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ) => {
    const hasDeadline =
      dayDeadlines.filter((dayDeadline) => day != null && dayDeadline.isSame(day, 'date'))
        .length > 0;
    const isFilteredDay = filteredDay && day?.isSame(filteredDay, 'date');
    return (
      <DayRootContainer style={{ position: 'relative' }}>
        {dayComponent}
        {hasDeadline && <DeadlineBadge />}
        {isFilteredDay && <FilterBadge />}
      </DayRootContainer>
    );
  };

  return (
    <CalendarRoot>
      <Container>
        <DatePicker
          value={datePickerValue}
          onChange={onDateChange}
          variant="static"
          disableToolbar
          renderDay={dayRenderer}
          leftArrowButtonProps={{
            ref: leftButtonRef,
          }}
          rightArrowButtonProps={{
            ref: rightButtonRef,
          }}
        />
      </Container>
    </CalendarRoot>
  );
};

const DayRootContainer = styled.div`
  width: 100%;
  position: relative;
`;

const DeadlineBadge = styled.span`
  background-color: ${({ theme }) => theme.cmp.calendar.badge};
  width: 4px;
  height: 4px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 10px;
`;

const FilterBadge = styled.span`
  background-color: ${({ theme }) => theme.cmp.calendar.badge};
  width: 4px;
  height: 4px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 8px;
  left: 6px;
`;

const Container = styled.div`
  & .MuiPickersStaticWrapper-staticWrapperRoot {
    border-radius: 20px;
  }

  & .MuiPickersCalendarHeader-switchHeader {
    display: none;
  }

  & .MuiIconButton-root {
    border-radius: 8px;
    color: ${({ theme }) => theme.text.hightContrast};
    width: 34px;
    height: 34px;
  }

  & .MuiIconButton-root:hover {
    background-color: ${({ theme }) => theme.palette.tertiary};
    border-radius: 8px;
    width: 34px;
    height: 34px;
  }

  & .MuiPickersDay-daySelected {
    color: ${({ theme }) => theme.box.background};
    font-weight: bold;
    background-color: ${({ theme }) => theme.palette.secondary};
  }

  & .MuiPickersDay-day {
    margin: 3px 3px;
    font-weight: 400;
  }

  & .MuiTypography-body2 {
    font-weight: unset;
  }

  & .MuiPickersDay-day.MuiPickersDay-daySelected {
    font-weight: bold;
  }

  & .MuiPickersDay-day.MuiPickersDay-current {
    background-color: ${({ theme }) => theme.cmp.calendar.currentDay};
    color: ${({ theme }) => theme.text.hightContrast};
    font-weight: bold;
  }

  & .MuiPickersBasePicker-pickerView {
    min-height: initial;
    justify-content: flex-start;
  }

  & .MuiPickersCalendarHeader-daysHeader {
    justify-content: space-around;
  }

  & .MuiPickersCalendar-week {
    justify-content: space-around;
  }

  & .MuiPickersDay-daySelected:hover {
    background-color: ${({ theme }) => theme.palette.secondary};
  }

  & .MuiPickersDay-hidden {
    color: ${({ theme }) => theme.text.lowContrast};
    opacity: 1;
  }

  & .MuiPickersDay-current {
    font-weight: 600;
    background-color: ${({ theme }) => theme.cmp.calendar.currentDay};
  }

  & .MuiPickersDay-current.MuiPickersDay-daySelected {
    color: ${({ theme }) => theme.box.background};
    font-weight: bold;
    background-color: ${({ theme }) => theme.palette.secondary};
  }

  & .MuiTypography-caption {
    color: ${({ theme }) => theme.text.lowContrast};
    font-size: 0.88rem;
  }

  & .MuiPickersCalendar-transitionContainer {
    min-height: 200px;
  }
`;
