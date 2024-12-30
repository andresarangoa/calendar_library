import React from 'react';
import dayjs from 'dayjs';

export const MonthlyCellRender = ({ day, eventsData, onSelect }) => {
  const currentDate = dayjs(day).format('YYYY-MM-DD');
  const today = dayjs().format('YYYY-MM-DD'); // Get current date
  const events = eventsData.filter((event) => event.date === currentDate);

  return (
    <div
      className={`cell-container ${events.length ? 'event-cell' : ''}`}
      onClick={() => onSelect(day)}
    >
      {/* Highlight current day */}
      <div className={`day-number ${currentDate === today ? 'current-day' : ''}`}>
        <span>{day.format('D')}</span>
      </div>

      {/* Display events */}
      {events.map((event, index) => (
        <div key={index} className="event-wrapper">
          <div className="event-title-container">
            <div className="event-title">{event.title}</div>

            {/* Show number of events if greater than 0 */}
            {event.numberEvents > 0 && (
              <div className="event-circle">
                <span>{event.numberEvents}</span>
              </div>
            )}
          </div>
          <div className="event-time">{event.time}</div>
        </div>
      ))}
    </div>
  );
};
