/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import api from '../../services/api';

import 'react-day-picker/lib/style.css';
import { Container } from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface CalendarProps {
  data: {
    userId: string;
    selectedDate: Date;
    setSelectedDate(day: Date): void;
  };
}

const Calendar: React.FC<CalendarProps> = ({ data }: CalendarProps) => {
  const { userId, selectedDate, setSelectedDate } = data;
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day);
      }
    },
    [setSelectedDate],
  );

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${userId}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, userId]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <DayPicker
        fromMonth={new Date()}
        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
        modifiers={{
          available: { daysOfWeek: [1, 2, 3, 4, 5] },
        }}
        onMonthChange={handleMonthChange}
        selectedDays={selectedDate}
        onDayClick={handleDateChange}
      />
    </Container>
  );
};

export default Calendar;
