import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; // Import the ISO week plugin
import './CalendarGrid.scss';
import MonthlyCalendar from './montlyCalendar/MonthlyCalendar';
import WeeklyView from './weeklyView/WeeklyView';
import DailyView from './dailyView/DailyView';

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

export function CalendarGrid({ 
  montlyRenderCell, 
  weeklyRenderCell, 
  titleButton = "Add Event", 
  onAddEventClicked = () => {}, 
  hiddenViews = [] // New prop to specify hidden views
}) {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [viewMode, setViewMode] = useState('monthly');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const handleToday = () => setCurrentMonth(dayjs().startOf('month'));
  const handleViewChange = (mode) => {
    setViewMode(mode);
    setDropdownVisible(false);
  };

  // Define available views
  const availableViews = ['monthly', 'yearly', 'weekly', 'daily']
    .filter(view => !hiddenViews.includes(view)); // Filter out hidden views

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
              {availableViews.map((mode) => (
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

          <button onClick={() => onAddEventClicked()} className="add-event-button">{titleButton}</button>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === 'monthly' ? (
        <MonthlyCalendar currentMonth={currentMonth} cellRender={montlyRenderCell} />
      ) : viewMode === 'weekly' ? (
        <WeeklyView cellRender={weeklyRenderCell} />
      ) : viewMode === 'daily' ? (
        <DailyView cellRender={weeklyRenderCell} montlyRenderCell={montlyRenderCell} />
      ) : viewMode === 'yearly' ? (
        <></>
      ) : null}
    </div>
  );
}