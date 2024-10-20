import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; // Import the ISO week plugin
import './CalendarGrid.scss';

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

export function CalendarGrid({ cellRender, titleButton = "Add Event", onAddEventClicked = () => {}}) {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [viewMode, setViewMode] = useState('monthly');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const days = generateMonthDays(currentMonth);

  const isCurrentMonth = (day) => day.isSame(currentMonth, 'month');

  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const handleToday = () => setCurrentMonth(dayjs().startOf('month'));
  const handleViewChange = (mode) => {
    setViewMode(mode);
    setDropdownVisible(false);
  };

  return (
    <div>
      {/* Calendar Controls */}
      <div className="calendar-controls">
        {/* Left Aligned: Month Title */}
        <div className="month-title">{currentMonth.format('MMMM YYYY')}</div>

        {/* Right Aligned: Navigation, Dropdown, and Add Event */}
        <div className="controls-right">
          <div className="calendar-navigation">
            <button className="arrow-button" onClick={handlePrevMonth}>{"<"}</button>
            <button className="today-button" onClick={handleToday}>Today</button>
            <button className="arrow-button" onClick={handleNextMonth}>{">"}</button>
          </div>

          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} view
              <span className="arrow-down"></span>
            </button>
            <div className={`dropdown-content ${dropdownVisible ? 'show' : ''}`}>
              {['monthly', 'yearly', 'weekly', 'daily'].map((mode) => (
                <div
                  key={mode}
                  className="dropdown-item"
                  onClick={() => handleViewChange(mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div className="vertical-separator"></div>

          <button onClick={()=>onAddEventClicked()} className="add-event-button">{titleButton}</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`day-cell ${!isCurrentMonth(day) ? 'other-month' : ''} ${day.isSame(dayjs(), 'day') ? 'current-day' : ''
              }`}
          >
            {cellRender(day)}
          </div>
        ))}
      </div>
    </div>
  );
}
