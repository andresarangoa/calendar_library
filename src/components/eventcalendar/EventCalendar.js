import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CalendarGrid } from './CalendarGrid';
import './CalendarGrid.scss';

export function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample event data
  const eventsData = [
    { date: '2024-10-03', title: 'Design review', time: '10AM' },
    { date: '2024-10-03', title: 'Sales meeting', time: '2PM' },
    { date: '2024-10-05', title: 'Sam\'s birthday party', time: '2PM' },
    { date: '2024-10-07', title: 'Date night', time: '6PM' },
    { date: '2024-10-09', title: 'Hockey game', time: '7PM' },
    { date: '2024-10-22', title: 'Maple syrup museum', time: '3PM' },
    { date: '2024-10-30', title: 'Cinema with friends', time: '9PM' }
  ];

  // Select event handler
  const onSelect = (day) => {
    const currentDate = dayjs(day).format('YYYY-MM-DD');
    const event = eventsData.find((event) => event.date === currentDate);
    setSelectedEvent(event || null);
  };
  // Renders each cell of the calendar
  const cellRender = (day) => {
    const currentDate = dayjs(day).format('YYYY-MM-DD');
    const today = dayjs().format('YYYY-MM-DD'); // Get current date
    const events = eventsData.filter((event) => event.date === currentDate);

    return (
      <div
        className={`cell-container ${events.length ? 'event-cell' : ''}`}
        onClick={() => onSelect(day)}
      >
        {/* Add the 'current-day' class if it's today */}
        <div className={`day-number ${currentDate === today ? 'current-day' : ''}`}>
          <span>{day.format('D')}</span>
        </div>

        {/* Events below the day number */}
        {events.map((event, index) => (
          <div key={index} className="event-wrapper">
            <div className="event-title">{event.title}</div>
            <div className="event-time">{event.time}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Calendar</h2>
      <CalendarGrid cellRender={cellRender} />
      {selectedEvent && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-xl font-semibold mb-2">Selected Event</h3>
          <p>
            <strong>{selectedEvent.title}</strong> - {selectedEvent.time}
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => alert(`Event: ${selectedEvent.title} at ${selectedEvent.time}`)}
          >
            View Event
          </button>
        </div>
      )}
    </div>
  );
}
