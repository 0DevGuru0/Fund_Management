import React, { useRef, useState } from 'react';

import gsap from 'gsap';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import ArrowDown from '$application/assets/icons/arrow-down.svg';
import {
  DateRange,
  DateRangeProps,
  IDateRange,
} from '$application/components/atoms/datePicker/DateRangePicker';
import FormColumn from '$application/components/atoms/etc/FormColumn';
import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';
import { Select, SelectProps } from '$application/components/molecules/inputs/Select';

import { CreateFormItems } from './CreateFormItems';
import { formDataAtom } from './store';

const ReportAdvanced = () => {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [formData, setFormData] = useAtom(formDataAtom);

  const statusProps: SelectProps<string> = {
    items: ['In Progress', 'Pending', 'Completed'],
    label: 'Status',
    onSelect: (item) => {
      setFormData((a) => {
        a.status = item;
      });
    },
    selectedItems: formData.status ? [formData.status] : [],
  };

  const dateProps: DateRangeProps = {
    startDatePlaceholder: 'From',
    endDatePlaceHolder: 'To',
    onSelect: (date: IDateRange) => {
      setFormData((a) => {
        a.startDate = new Date(date.startDate!).toISOString();
        a.endDate = new Date(date.endDate!).toISOString();
      });
    },
  };

  const itemsRef = useRef(null);
  const arrowRef = useRef(null);
  const containerRef = useRef(null);
  const onClickHandler = () => {
    const tl = gsap.timeline({ onComplete: () => setShowAdvanced(!showAdvanced) });

    if (!showAdvanced) {
      tl.to(containerRef.current, {
        height: 123,
      }).to(itemsRef.current, {
        opacity: 1,
      });
    } else {
      tl.to(itemsRef.current, {
        opacity: 0,
      }).to(containerRef.current, {
        height: 25,
      });
    }

    gsap.to(arrowRef.current, { rotation: '+=180' });
  };

  return (
    <AdvancedContainer ref={containerRef}>
      <AdvanceContainer onClick={onClickHandler}>
        <Icon ref={arrowRef}>
          <ArrowDown />
        </Icon>
        Advanced filter
      </AdvanceContainer>
      <StyledFormContainer ref={itemsRef} display={showAdvanced}>
        <CreateFormItems filtersMode="advance" />
        <FormControl>
          <Select {...statusProps} />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <StyledDateRange {...dateProps} />
        </FormControl>
      </StyledFormContainer>
    </AdvancedContainer>
  );
};

export default ReportAdvanced;

const AdvancedContainer = styled.div`
  border: dashed 1px ${({ theme }) => theme.palette.grey[600]};
  border-radius: 10px;
  padding: 25px;
  margin-top: 20px;
`;

const StyledDateRange = styled(DateRange)`
  min-width: initial !important;
`;

const StyledFormContainer = styled(FormColumn)`
  margin-top: 15px;
  display: ${(props) => (props.display ? 'flex' : 'none')};
`;

const AdvanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  margin-right: 5px;
  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[600]} !important;
    }
  }
`;
