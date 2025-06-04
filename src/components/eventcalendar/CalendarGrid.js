import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; // Import the ISO week plugin
import './CalendarGrid.scss';
import MonthlyCalendar from './montlyCalendar/MonthlyCalendar';
import WeeklyView from './weeklyView/WeeklyView';
import DailyView from './dailyView/DailyView';

// Extend dayjs with ISO week support
dayjs.extend(isoWeek);

export function CalendarGrid({
  montlyRenderCell,
  weeklyRenderCell,
  dailyRenderCell,
  titleButton = "+ Add Event",
  onAddEventClicked = () => { },
  visibilityOptions = [],
  onDailyEvent 
}) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState('monthly');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { filters: visibilityFilters } = visibilityOptions;

  // Dynamic navigation handlers based on view mode
  const handlePrev = () => {
    switch (viewMode) {
      case 'monthly':
        setCurrentDate(currentDate.subtract(1, 'month'));
        break;
      case 'weekly':
        setCurrentDate(currentDate.subtract(1, 'week'));
        break;
      case 'daily':
        setCurrentDate(currentDate.subtract(1, 'day'));
        break;
      case 'yearly':
        setCurrentDate(currentDate.subtract(1, 'year'));
        break;
      default:
        setCurrentDate(currentDate.subtract(1, 'month'));
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case 'monthly':
        setCurrentDate(currentDate.add(1, 'month'));
        break;
      case 'weekly':
        setCurrentDate(currentDate.add(1, 'week'));
        break;
      case 'daily':
        setCurrentDate(currentDate.add(1, 'day'));
        break;
      case 'yearly':
        setCurrentDate(currentDate.add(1, 'year'));
        break;
      default:
        setCurrentDate(currentDate.add(1, 'month'));
    }
  };

  const handleToday = () => {
    const today = dayjs();
    switch (viewMode) {
      case 'monthly':
        setCurrentDate(today.startOf('month'));
        break;
      case 'weekly':
      case 'daily':
        setCurrentDate(today);
        break;
      case 'yearly':
        setCurrentDate(today.startOf('year'));
        break;
      default:
        setCurrentDate(today);
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    setDropdownVisible(false);
    
    // Adjust current date when switching views to maintain context
    switch (mode) {
      case 'monthly':
        setCurrentDate(currentDate.startOf('month'));
        break;
      case 'weekly':
      case 'daily':
        // Keep current date as is for weekly/daily views
        break;
      case 'yearly':
        setCurrentDate(currentDate.startOf('year'));
        break;
    }
  };

  // Dynamic title based on view mode
  const getTitle = () => {
    switch (viewMode) {
      case 'monthly':
        return currentDate.format('MMMM YYYY');
      case 'weekly':
        const weekStart = currentDate.startOf('isoWeek');
        const weekEnd = currentDate.endOf('isoWeek');
        return `${weekStart.format('MMM D')} - ${weekEnd.format('MMM D, YYYY')}`;
      case 'daily':
        return currentDate.format('dddd, MMMM D, YYYY');
      case 'yearly':
        return currentDate.format('YYYY');
      default:
        return currentDate.format('MMMM YYYY');
    }
  };

  // Define available views
  const availableViews = Object.keys(visibilityFilters) // Get keys like ['yearly', 'monthly', 'weekly', 'daily']
    .filter((view) => visibilityFilters[view]) // Keep views with `true` in `viewConfig`

  return (
    <div>
      {/* Calendar Controls */}
      <div className="calendar-controls">
        {/* Left Aligned: Title */}
        <div className="month-title">{getTitle()}</div>

        {/* Right Aligned: Navigation, Dropdown, and Add Event */}
        <div className="controls-right">
          {
            (visibilityOptions?.todayButton == true) ? (
              <div className="calendar-navigation">
                <button className="arrow-button" onClick={handlePrev}>{"<"}</button>
                <button className="today-button" onClick={handleToday}>Today</button>
                <button className="arrow-button" onClick={handleNext}>{">"}</button>
              </div>
            ) : null
          }
          {
            (visibilityOptions?.dropdownFilter == true) ? (
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
              </div>) : null
          }

          {
            visibilityOptions?.addEventButton ? (
              <>
                <div className="vertical-separator"></div>
                <button onClick={() => onAddEventClicked()} className="add-event-button">{titleButton}</button>
              </>
            ) : null
          }
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === 'monthly' ? (
        <MonthlyCalendar currentMonth={currentDate.startOf('month')} cellRender={montlyRenderCell} />
      ) : viewMode === 'weekly' ? (
        <WeeklyView currentDate={currentDate} cellRender={weeklyRenderCell} />
      ) : viewMode === 'daily' ? (
        <DailyView currentDate={currentDate} cellRender={dailyRenderCell} onDailyEvent={onDailyEvent}/>
      ) : viewMode === 'yearly' ? (
        <></>
      ) : null}
    </div>
  );
}