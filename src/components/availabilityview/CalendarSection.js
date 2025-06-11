// CalendarSection.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calendarDefaults, mergeClasses } from './utils';

const CalendarSection = ({ 
  onDateSelect, 
  selectedDate,
  disablePastDays = calendarDefaults.disablePastDays,
  monthNames = calendarDefaults.monthNames,
  weekDays = calendarDefaults.weekDays,
  theme = {},
  customClasses = {},
  animations = {},
  icons = {},
  customStyles = {},
  renderDayContent,
  shouldDisableDate,
  onMonthChange,
  minDate,
  maxDate,
  highlightedDates = [],
  customNavigation,
  locale = 'en-US'
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Merge styles with defaults
  const styles = {
    ...calendarDefaults.styles,
    ...customStyles
  };
  
  // Icon configuration
  const iconConfig = {
    size: 16,
    ...icons
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    
    // Check min/max date constraints
    if (minDate && newDate < new Date(minDate.getFullYear(), minDate.getMonth(), 1)) return;
    if (maxDate && newDate > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)) return;
    
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleDateClick = (day) => {
    if (day && !isDateDisabled(day)) {
      const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      onDateSelect(selectedDateObj);
    }
  };

  // Check if a day is today
  const isToday = (day) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  // Check if a day is disabled
  const isDateDisabled = (day) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // Custom disable logic
    if (shouldDisableDate && shouldDisableDate(dayDate)) return true;
    
    // Past days logic
    if (disablePastDays && isPastDay(day)) return true;
    
    // Min/max date constraints
    if (minDate && dayDate < minDate) return true;
    if (maxDate && dayDate > maxDate) return true;
    
    return false;
  };

  // Check if a day is in the past
  const isPastDay = (day) => {
    if (!disablePastDays) return false;
    
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return dayDate < todayDate;
  };

  // Check if a day is selected
  const isSelected = (day) => {
    return selectedDate && 
           selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentDate.getMonth() &&
           selectedDate.getFullYear() === currentDate.getFullYear();
  };
  
  // Check if a day is highlighted
  const isHighlighted = (day) => {
    return highlightedDates.some(date => 
      date.getDate() === day && 
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getDayButtonClass = (day) => {
    const baseClass = styles.dayButton.base;
    
    if (isDateDisabled(day)) return mergeClasses(baseClass, styles.dayButton.disabled, customClasses.dayButtonDisabled);
    if (isSelected(day)) return mergeClasses(baseClass, styles.dayButton.selected, customClasses.dayButtonSelected);
    if (isHighlighted(day)) return mergeClasses(baseClass, styles.dayButton.highlighted || styles.dayButton.default, customClasses.dayButtonHighlighted);
    
    return mergeClasses(baseClass, styles.dayButton.default, customClasses.dayButton);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={mergeClasses(styles.container, customClasses.container)}>
      {/* Calendar Header */}
      <div className={mergeClasses(styles.header, customClasses.header)}>
        <h2 className={mergeClasses(styles.monthTitle, customClasses.monthTitle)}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        {customNavigation ? (
          customNavigation(currentDate, navigateMonth)
        ) : (
          <div className={mergeClasses(styles.navigationButtons, customClasses.navigationButtons)}>
            <button 
              onClick={() => navigateMonth(-1)}
              disabled={minDate && currentDate <= new Date(minDate.getFullYear(), minDate.getMonth(), 1)}
              className={mergeClasses(styles.navButton, customClasses.navButton)}
              aria-label="Previous month"
            >
              <ChevronLeft size={iconConfig.size} className={mergeClasses(styles.navIcon, customClasses.navIcon)} />
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              disabled={maxDate && currentDate >= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)}
              className={mergeClasses(styles.navButton, customClasses.navButton)}
              aria-label="Next month"
            >
              <ChevronRight size={iconConfig.size} className={mergeClasses(styles.navIcon, customClasses.navIcon)} />
            </button>
          </div>
        )}
      </div>

      {/* Calendar Grid */}
      <div className={mergeClasses(styles.grid, customClasses.grid)}>
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div 
            key={day} 
            className={mergeClasses(styles.weekDayHeader, customClasses.weekDayHeader)}
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => (
          <div 
            key={index} 
            className={mergeClasses(styles.dayCell, customClasses.dayCell)}
          >
            {day && (
              <button
                onClick={() => handleDateClick(day)}
                disabled={isDateDisabled(day)}
                className={getDayButtonClass(day)}
                aria-label={`${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`}
                aria-selected={isSelected(day)}
                aria-disabled={isDateDisabled(day)}
              >
                {renderDayContent ? (
                  renderDayContent(day, {
                    isToday: isToday(day),
                    isSelected: isSelected(day),
                    isDisabled: isDateDisabled(day),
                    isHighlighted: isHighlighted(day),
                    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                  })
                ) : (
                  <>
                    {day}
                    {isToday(day) && (
                      <div className={mergeClasses(styles.todayMarker, customClasses.todayMarker)} />
                    )}
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSection;