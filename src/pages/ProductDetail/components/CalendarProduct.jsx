import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { setDates } from '../../../actions';

import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const productData = useSelector(state => state.productData);
  const { startDay, endDay } = useSelector(state => state.dates);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  // const handleStartDateChange = date => {
  //   setStartDate(date);
  //   dispatch(setDates(date, endDate));
  // };

  // const handleEndDateChange = date => {
  //   setEndDate(date);
  //   dispatch(setDates(startDate, date));
  // };

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    dispatch(setDates(start, end));
  };

  // const [startDateOpen, setStartDateOpen] = useState(true);
  // const [endDateOpen, setEndDateOpen] = useState(true);
  return (
    <CalendarWrapper>
      <CalendarTitle>
        {productData.name} -{' '}
        {endDate &&
          startDate &&
          `${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}박
          ${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}일`}
      </CalendarTitle>
      <DateRange>
        {startDate &&
          startDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
        ~{' '}
        {endDate &&
          endDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </DateRange>
      <DatePickerWrapper>
        {/* <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          minDate={new Date()}
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
        /> */}
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          monthsShown={2}
          selectsRange
          inline
        />
      </DatePickerWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div`
  width: 600px;
`;

const CalendarTitle = styled.h1`
  // Your styles here
`;

const DateRange = styled.h2`
  // Your styles here
`;

const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
