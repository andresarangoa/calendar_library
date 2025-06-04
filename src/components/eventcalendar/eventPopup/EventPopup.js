import React from 'react';
import { createPortal } from 'react-dom';
import './EventPopup.scss';

const EventsPopup = ({onEventClick, dayLabel, events, onClose }) => {
  return createPortal(
    <div className="events-popup__backdrop" onClick={onClose}>
      <div
        className="events-popup"
        onClick={e => e.stopPropagation()}  // keep clicks inside
      >
        <header>
          <h3>{dayLabel.format('ddd').toUpperCase()}</h3>
          <p>{dayLabel.format('D')}</p>
        </header>

        <div className="events-popup__list">
          {events.map(evt => (
            <div
              key={`${evt.time}-${evt.title}`}
              onClick={() => onEventClick(evt)}
              className="event-wrapper"
              style={{ '--event-color': evt.color }}
            >
              <div className="event-time">{evt.time}</div>
              <div className="event-title">{evt.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EventsPopup;