import React, { FC, useEffect, useState, RefObject } from 'react';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import styled, { css } from 'styled-components';

import ChevronLeft from '$application/assets/icons/chevron-left.svg';
import ChevronRight from '$application/assets/icons/chevron-right.svg';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

export interface CalendarHeadProps {
  rightButtonRef: RefObject<HTMLButtonElement>;
  leftButtonRef: RefObject<HTMLButtonElement>;
}

export const CalendarMonth: FC<CalendarHeadProps> = ({
  rightButtonRef,
  leftButtonRef,
}) => {
  const [, setDummyTicker] = useState(1);
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    const ticker = setInterval(() => {
      setDummyTicker(new Date().getTime());
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  const onLeftClicked = () => {
    if (leftButtonRef && leftButtonRef.current) {
      leftButtonRef.current.click();
      setMonthOffset(monthOffset - 1);
    }
  };

  const onRightClicked = () => {
    if (rightButtonRef && rightButtonRef.current) {
      rightButtonRef.current.click();
      setMonthOffset(monthOffset + 1);
    }
  };

  return (
    <>
      <HeadContainer>
        <YearMonth>{dayjs().add(monthOffset, 'months').format('MMMM YYYY')}</YearMonth>
        <ChevyContainer>
          <HeadChevyLeft onClick={onLeftClicked}>
            <ChevronLeft />
            <Tooltip>
              {dayjs()
                .add(monthOffset - 1, 'months')
                .format('MMMM')}
            </Tooltip>
          </HeadChevyLeft>
          <HeadChevyRight onClick={onRightClicked}>
            <ChevronRight />
            <Tooltip>
              {dayjs()
                .add(monthOffset + 1, 'months')
                .format('MMMM')}
            </Tooltip>
          </HeadChevyRight>
        </ChevyContainer>
      </HeadContainer>
    </>
  );
};

const Tooltip = styled.span`
  position: absolute;
  display: none;
  top: 35px;
  left: 25px;
  color: ${({ theme }) => theme.background.primary};
  font-size: 12px;
  background-color: ${({ theme }) => theme.text.hightContrast};
  border-radius: 4px;
  padding: 3px 6px;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 0px 36px;
`;

const YearMonth = styled.span`
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.text.primary};
  font-weight: bold;
  display: block;
`;

const ChevyContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeadChevy = css`
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 5px;
  padding: 3px;
  height: 18px;
  width: 18px;
  position: relative;
  cursor: pointer;

  > svg {
    height: 18px;
    width: 18px;
  }

  > svg path,
  > svg use {
    fill: ${({ theme }) => theme.text.lowContrast};
    background-size: 12px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primaryWarm};
    > svg path,
    > svg use {
      fill: ${({ theme }) => theme.palette.primary};
    }
  }
`;

const HeadChevyLeft = styled.span`
  ${HeadChevy}
  margin-right: 6px;
  &:hover ${Tooltip} {
    display: inline-block;
  }
`;

const HeadChevyRight = styled.span`
  ${HeadChevy}
  margin-left: 6px;
  &:hover ${Tooltip} {
    display: inline-block;
  }
`;
