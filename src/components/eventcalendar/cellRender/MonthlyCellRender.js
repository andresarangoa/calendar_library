import React, { useState } from 'react';
import dayjs from 'dayjs';
import EventsPopup from '../eventPopup/EventPopup';

export const MonthlyCellRender = ({ day, eventsData, onSelect, getEventColor }) => {
  const [showPopup, setShowPopup] = useState(false);

  const currentDate = dayjs(day).format('YYYY-MM-DD');
  const today = dayjs().format('YYYY-MM-DD');

  const eventsToday = eventsData.filter(e => e.date === currentDate);

  const sorted = eventsToday
    .map(e => ({ ...e, color: e.color ?? getEventColor(e) }))
    .sort((a, b) => a.time.localeCompare(b.time));

  const visibleEvents = sorted.slice(0, 3);
  const hiddenCount = sorted.length - visibleEvents.length;

  return (
    <>
      <div
        className={`cell-container ${sorted.length ? 'event-cell' : ''}`}
        
      >
        {/* date number */}
        <div className={`day-number ${currentDate === today ? 'current-day' : ''}`}>
          <span>{day.format('D')}</span>
        </div>

        {/* first three events (already sorted) */}
        {visibleEvents.map(evt => (
          <div
            onClick={() => onSelect(evt)}
            key={`${evt.time}-${evt.title}`}
            className="event-wrapper"
            style={{ '--event-color': evt.color }}
          >
            <div className="event-time">{evt.time}</div>
            <div className="event-title">{evt.title}</div>
          </div>
        ))}

        {/* “+ n More” link */}
        {hiddenCount > 0 && (
          <div
            className="more-events"
            onClick={e => {
              e.stopPropagation();   // don’t trigger onSelect
              setShowPopup(true);
            }}
          >
            +{hiddenCount} More
          </div>
        )}
      </div>

      {/* modal with the full, sorted list */}
      {showPopup && (
        <EventsPopup
          dayLabel={day}
          events={sorted}
          onEventClick={(evt) => {
            onSelect(evt);      // whatever you need to do with it
            setShowPopup(false);
          }}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};
