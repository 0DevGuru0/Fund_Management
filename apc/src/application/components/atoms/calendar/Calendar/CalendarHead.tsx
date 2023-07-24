import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import styled from 'styled-components';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

export const CalendarHead = () => {
  const [, setDummyTicker] = useState(1);

  useEffect(() => {
    const ticker = setInterval(() => {
      setDummyTicker(new Date().getTime());
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  const daytimeIcon = () => {
    const hour = new Date().getHours();
    return `/weather/${hour >= 6 && hour < 18 ? 'sunny-partial' : 'moon-partial'}.png`;
  };

  return (
    <>
      <InfoContainer>
        <DayTimeContainer>
          <TheDay>{dayjs().format('dddd')}</TheDay>
          <TheTime>{dayjs().format('HH:mm')}</TheTime>
        </DayTimeContainer>
        <WeatherContainer src={daytimeIcon()} />
      </InfoContainer>
    </>
  );
};

const WeatherContainer = styled.img`
  width: 137px;
  height: auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`;
const DayTimeContainer = styled.div``;

const TheDay = styled.span`
  font-size: 1.2rem;
  line-height: 24px;
  color: ${({ theme }) => theme.text.primary};
  font-weight: normal;
  display: block;
`;

const TheTime = styled.span`
  font-size: 48px;
  color: ${({ theme }) => theme.text.hightContrast};
  font-weight: bold;
`;
