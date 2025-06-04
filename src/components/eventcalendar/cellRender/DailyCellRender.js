import React from 'react';
import dayjs from 'dayjs';

export const DailyCellRender = ({ day, eventsData, onSelect, interval, className = "" }) => {
  // Calculate the date and time for the specific cell
  const dayJsObj = dayjs(day);
  const currentDateTime = dayJsObj.hour(interval.hour).minute(interval.half ? 30 : 0);
  const formattedDate = currentDateTime.format('YYYY-MM-DD');
  
  // Current slot time in minutes from 00:00
  const slotStart = interval.hour * 60 + (interval.half ? 30 : 0);
  
  // Get events for this specific day
  const eventsForDay = eventsData.filter((event) => {
    const eventDate = dayjs(event.date, 'YYYY-MM-DD');
    return eventDate.format('YYYY-MM-DD') === formattedDate;
  });

  // Helper function to parse time strings like "08:15"
  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hour: hours, minutes: minutes || 0 };
  };

  // Filter events that should be rendered in this specific slot
  const eventsToRender = eventsForDay.filter((event) => {
    const eventStart = parseTime(event.time);
    const eventStartMinutes = eventStart.hour * 60 + eventStart.minutes;
    
    // Only render the event in its starting slot to avoid duplicates
    const eventStartSlot = Math.floor(eventStartMinutes / 30) * 30;
    
    return slotStart === eventStartSlot;
  });

  return (
    <div
      className={`cell-container ${eventsToRender.length ? 'event-cell' : ''}`}
    >
      {/* Display events */}
      {eventsToRender.map((event, index) => {

        const eventStart = parseTime(event.time);
        const eventEnd = parseTime(event.endTime);
        const eventStartMinutes = eventStart.hour * 60 + eventStart.minutes;
        const eventEndMinutes = eventEnd.hour * 60 + eventEnd.minutes;
        
        // Calculate event dimensions
        const totalDurationMinutes = eventEndMinutes - eventStartMinutes;
        const slotHeight = 3.4; // rem - height of each 30-minute slot
        const heightInRem = (totalDurationMinutes / 30) * slotHeight;
        
        // Calculate offset from top of the slot
        const eventStartSlot = Math.floor(eventStartMinutes / 30) * 30;
        const offsetInSlot = eventStartMinutes - eventStartSlot;
        const topOffsetInRem = (offsetInSlot / 30) * slotHeight;

        return (
          <div
            onClick={() => onSelect(event)}
            key={`${event.id || index}-${formattedDate}`}
            className={`calendar-event-pill ${className}`}
            style={{
              '--event-color': event.color || '#8b5cf6',
              backgroundColor: `color-mix(in srgb, ${event.color || '#8b5cf6'} 20%, white)`,
              position: 'absolute',
              top: `${topOffsetInRem}rem`,
              height: `${heightInRem}rem`,
              left: '4px',
              right: '4px',
              zIndex: 10
            }}
          >
            <div className="event-content">
              <div className="event-title">
                {event.title}
              </div>
              <div className="event-time">
                {event.time} - {event.endTime}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};