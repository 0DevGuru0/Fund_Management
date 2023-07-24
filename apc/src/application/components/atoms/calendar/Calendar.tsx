import React, { FC, useRef } from 'react';

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import clsx from 'classnames';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import styled from 'styled-components';

import { CalendarCore } from './Calendar/CalendarCore';
import { CalendarHead } from './Calendar/CalendarHead';
import { CalendarMonth } from './Calendar/CalendarMonth';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

export interface CalendarProps {
  deadlines?: (string | Date)[];
  onChange: React.Dispatch<MaterialUiPickersDate>;
  className?: string;
  filteredDay: Date | null;
}

export const Calendar: FC<CalendarProps> = ({
  className,
  deadlines = [],
  onChange,
  filteredDay,
}) => {
  const leftRef = useRef<any>();
  const rightRef = useRef<any>();

  return (
    <Container className={clsx('calendar', className)}>
      <CalendarHead />
      <MonthDaysContainer>
        <CalendarMonth leftButtonRef={leftRef} rightButtonRef={rightRef} />
        <CalendarCore
          deadlines={deadlines}
          onChange={onChange}
          leftButtonRef={leftRef}
          rightButtonRef={rightRef}
          filteredDay={filteredDay}
        />
      </MonthDaysContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background.primary};
`;

const MonthDaysContainer = styled.div`
  align-self: center;
`;
