// TimeSlotSection.jsx
import React from 'react';
import { timeSlotDefaults, defaultAvailability, mergeClasses } from './utils';

const TimeSlotSection = ({ 
  selectedDate, 
  onTimeSelect, 
  selectedTime, 
  timeSlots = defaultAvailability,
  theme = {},
  customClasses = {},
  animations = {},
  customStyles = {},
  formatDate = timeSlotDefaults.formatDate,
  renderTimeSlot,
  renderHeader,
  shouldDisableTime,
  groupTimeSlots = false,
  timeSlotGroups = {
    morning: { label: 'Morning', range: [0, 12] },
    afternoon: { label: 'Afternoon', range: [12, 17] },
    evening: { label: 'Evening', range: [17, 24] }
  },
  scrollBehavior = 'smooth',
  maxHeight = '530px',
  hideScrollbar = true,
  emptyStateMessage = 'No time slots available',
  renderEmptyState
}) => {
  // Merge styles with defaults
  const styles = {
    ...timeSlotDefaults.styles,
    ...customStyles
  };
  
  // Custom scroll container styles
  const scrollStyles = hideScrollbar ? {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  } : {};

  // Group time slots if enabled
  const getGroupedTimeSlots = () => {
    if (!groupTimeSlots) return { all: timeSlots };
    
    const groups = {};
    
    timeSlots.forEach(time => {
      const hour = parseInt(time.split(':')[0]);
      const adjustedHour = time.includes('PM') && hour !== 12 ? hour + 12 : hour;
      
      for (const [key, group] of Object.entries(timeSlotGroups)) {
        if (adjustedHour >= group.range[0] && adjustedHour < group.range[1]) {
          if (!groups[key]) groups[key] = { ...group, slots: [] };
          groups[key].slots.push(time);
          break;
        }
      }
    });
    
    return groups;
  };

  const isTimeDisabled = (time) => {
    if (shouldDisableTime) {
      return shouldDisableTime(time, selectedDate);
    }
    return false;
  };

  const getSlotButtonClass = (time) => {
    const baseClass = styles.slotButton.base;
    
    if (isTimeDisabled(time)) {
      return mergeClasses(baseClass, styles.slotButton.disabled || styles.slotButton.default, customClasses.slotButtonDisabled);
    }
    
    if (selectedTime === time) {
      return mergeClasses(baseClass, styles.slotButton.selected, customClasses.slotButtonSelected);
    }
    
    return mergeClasses(baseClass, styles.slotButton.default, customClasses.slotButton);
  };

  const groupedSlots = getGroupedTimeSlots();
  const hasSlots = timeSlots && timeSlots.length > 0;

  return (
    <div className={mergeClasses(styles.container, customClasses.container)}>
      {renderHeader ? (
        renderHeader(selectedDate, formatDate)
      ) : (
        <h3 className={mergeClasses(styles.header, customClasses.header)}>
          {formatDate(selectedDate)}
        </h3>
      )}

      {!hasSlots ? (
        renderEmptyState ? renderEmptyState() : (
          <div className={mergeClasses('cal-flex cal-items-center cal-justify-center cal-h-full cal-text-gray-500', customClasses.emptyState)}>
            {emptyStateMessage}
          </div>
        )
      ) : (
        <div
          className={mergeClasses(styles.scrollContainer, customClasses.scrollContainer)}
          style={{ 
            maxHeight, 
            ...scrollStyles,
            scrollBehavior 
          }}
        >
          {hideScrollbar && (
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          )}
          
          <div className={mergeClasses(styles.slotList, customClasses.slotList)}>
            {groupTimeSlots ? (
              Object.entries(groupedSlots).map(([groupKey, group]) => (
                group.slots && group.slots.length > 0 && (
                  <div key={groupKey} className={mergeClasses('cal-mb-4', customClasses.slotGroup)}>
                    {group.label && (
                      <h4 className={mergeClasses('cal-text-xs cal-font-semibold cal-text-gray-600 cal-mb-2 cal-uppercase', customClasses.groupLabel)}>
                        {group.label}
                      </h4>
                    )}
                    <div className="cal-space-y-2">
                      {group.slots.map((time, index) => (
                        <button
                          key={`${groupKey}-${index}`}
                          onClick={() => !isTimeDisabled(time) && onTimeSelect(time)}
                          disabled={isTimeDisabled(time)}
                          className={getSlotButtonClass(time)}
                          aria-label={`Select time ${time}`}
                          aria-selected={selectedTime === time}
                          aria-disabled={isTimeDisabled(time)}
                        >
                          {renderTimeSlot ? renderTimeSlot(time, {
                            isSelected: selectedTime === time,
                            isDisabled: isTimeDisabled(time),
                            date: selectedDate
                          }) : time}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))
            ) : (
              timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => !isTimeDisabled(time) && onTimeSelect(time)}
                  disabled={isTimeDisabled(time)}
                  className={getSlotButtonClass(time)}
                  aria-label={`Select time ${time}`}
                  aria-selected={selectedTime === time}
                  aria-disabled={isTimeDisabled(time)}
                >
                  {renderTimeSlot ? renderTimeSlot(time, {
                    isSelected: selectedTime === time,
                    isDisabled: isTimeDisabled(time),
                    date: selectedDate
                  }) : time}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSection;