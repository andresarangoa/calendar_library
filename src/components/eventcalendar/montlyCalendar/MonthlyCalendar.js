import React from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../../styles/CalendarGrid.scss';

// Extend dayjs with ISO week support
dayjs.extend(isoWeek);

// Helper function to generate days for the current month, including at least one week of the next month
const generateMonthDays = (month) => {
  const days = [];
  const startDay = dayjs(month).startOf('month').startOf('isoWeek'); // Use ISO week for Monday start
  const endDay = dayjs(month).add(1, 'month').startOf('month').endOf('isoWeek'); // Extend to the end of the ISO week

  let day = startDay.clone();
  while (day.isBefore(endDay, 'day') || day.isSame(endDay, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  return days;
};

// New MonthlyCalendar Component
export const MonthlyCalendar = ({ currentMonth, cellRender, size }) => {
  const days = generateMonthDays(currentMonth);

  // Check if the day is in the current month
  const isCurrentMonth = (day) => day.isSame(currentMonth, 'month');
  
  // Inline styles based on the size prop
  const containerStyle = size ? { width: size.width, height: size.height } : {};

  return (
    <div className="calendar-grid" style={containerStyle}>
      {/* Weekday Headers */}
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
        <div key={index} className="day-header">
          {day}
        </div>
      ))}

      {/* Days of the Month */}
      {days.map((day, index) => (
        <div
          key={index}
          className={`day-cell ${!isCurrentMonth(day) ? 'other-month' : ''} ${day.isSame(dayjs(), 'day') ? 'current-day' : ''}`}
        >
          {cellRender(day)}
        </div>
      ))}
    </div>
  );
};

export default MonthlyCalendar;
