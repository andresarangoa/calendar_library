import React from 'react';
import dayjs from 'dayjs';

export const WeeklyCellRender = ({ day, eventsData, onSelect, interval }) => {
  // Calculate the date and time for the specific cell
  const dayJsObj = dayjs(day);
  const currentDateTime = dayJsObj.hour(interval.hour).minute(interval.half ? 30 : 0);
  const formattedDate = currentDateTime.format('YYYY-MM-DD');
  const formattedTime = currentDateTime.format('HH:mm');
  const currentDateTimeFormatted = `${formattedDate} ${formattedTime}`;

  // Filter events that match the current date and time
  const events = eventsData.filter((event) => {
    // Parse event date
    const eventDate = dayjs(event.date, 'YYYY-MM-DD');

    // Set event time directly using hour and minute
    const [eventHour, eventMinute] = event.time.split(':').map(Number);
    const eventDateTime = eventDate.hour(eventHour).minute(eventMinute);

    // Compare all components explicitly to avoid timezone issues
    return (
      eventDateTime.year() === currentDateTime.year() &&
      eventDateTime.month() === currentDateTime.month() &&
      eventDateTime.date() === currentDateTime.date() &&
      eventDateTime.hour() === currentDateTime.hour() 
    );
  });


  return (
    <div
      className={`cell-container ${events.length ? 'event-cell' : ''}`}
      onClick={() => onSelect(currentDateTime)}
    >
      {/* Display events */}
      {events.map((event, index) => (
        <div
          key={index}
          className="event-wrapper"
          style={{
            backgroundColor: '#E6F7FF',
            borderRadius: '4px',
          }}
        >
          <div className="event-title" style={{ fontWeight: 'bold', color: '#1890FF' }}>
            {event.title}
          </div>
          <div className="event-time">{`${event.time} - ${event.endTime}`}</div>
        </div>
      ))}

    </div>
  );
};
