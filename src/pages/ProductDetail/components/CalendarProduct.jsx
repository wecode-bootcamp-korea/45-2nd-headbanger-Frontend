import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { setDates } from '../../../actions';
import { Title } from './TxtDescription';
import { ko } from 'date-fns/locale';
import './calendarProduct.css';
import { flexSort } from '../../../styles/mixin';

const Calendar = () => {
  const productData = useSelector(state => state.productData);
  const { startDay, endDay } = useSelector(state => state.dates);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    dispatch(setDates(start, end));
  };

  return (
    <CalendarWrapper>
      <Title>{productData.name}</Title>
      <DateRange>
        <h2 classname="range">
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
        </h2>
        <h2 className="night">
          {endDate &&
            startDate &&
            `${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}박
          ${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}일`}
        </h2>
      </DateRange>
      <DatePickerWrapper>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          monthsShown={2}
          selectsRange
          inline
          locale={ko}
        />
      </DatePickerWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div`
  width: 600px;
`;

const DateRange = styled.h2`
  /* ${flexSort('flex-start', 'center')} */
  display: flex;
  flex-direction: column;
  height: 40px;
  gap: 16px;
  margin-top: 40px;
  .range {
    font-size: 20px;
  }
  .night {
    font-size: 16px;
  }
`;

const DatePickerWrapper = styled.div`
  margin-top: 40px;
  width: 600px;
  .react-datepicker {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: none;
  }

  .react-datepicker__month-container {
    width: 280px;
  }
`;
