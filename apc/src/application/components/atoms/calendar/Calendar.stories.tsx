import React, { useState } from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { Calendar, CalendarProps } from './Calendar';

export default {
  title: 'Atoms / Calendar',
  component: Calendar,
};

const three = 3;
const one = 1;

export const CalendarComponent: StoryFC<Omit<CalendarProps, 'deadlines'>> = (args) => {
  const [filteredDay] = useState<Date | null>(new Date());
  const deadlines = [
    dayjs().toDate(),
    dayjs().add(three, 'days').toDate(),
    dayjs().add(one, 'months').toDate(),
    dayjs().subtract(three, 'days').toDate(),
  ];

  return (
    <Container>
      <Calendar {...args} deadlines={deadlines} filteredDay={filteredDay} />
    </Container>
  );
};

CalendarComponent.args = {
  filteredDay: new Date(),
};

CalendarComponent.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac80993f926f8e2d53d704',
};

const Container = styled.div`
  width: 369px;
`;
