import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CalendarGrid } from './CalendarGrid';
import './CalendarGrid.scss';
import { CellRender } from './cellRender/CellRender'; 

const defaultStyles = {
  colorActualDay: '#fff',
  colorFontTitle: '#000',
  colorFontButtons: '#000',
  colorFontNameDays: '#000',
  colorFontDays: '#000',
  sizeFontAppoinment: '0.85rem',
  sizeFontButtons: '1rem',
  sizeFontNameDays: '0.85rem',
  sizeFontDays: '0.9rem',
  bgHeader: '#f9fafb',
  bgDaysNames: '#f0f0f0',
  bgCells: '#fff',
  bgActualDay: '#000',
  visibilityOptions: {
    todayButton: true,
    dropdownFilter: true,
    addEventButton: true,
    header: true,
    daysNames: true,
  },
};

export function EventCalendar({eventsData = [], styles= defaultStyles}) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    colorActualDay,
    colorFontTitle,
    colorFontButtons,
    colorFontNameDays,
    colorFontDays,
    sizeFontAppoinment,
    sizeFontButtons,
    sizeFontNameDays,
    sizeFontDays,
    bgHeader,
    bgDaysNames,
    bgCells,
    bgActualDay,
    visibilityOptions,
  } = styles;

  const customStyles = {
    '--current-day-bg': bgActualDay,
    '--current-day-color': colorActualDay,
    '--event-title-color': colorFontTitle,
    '--event-title-font-size': sizeFontAppoinment,
    '--button-color': colorFontButtons,
    '--button-font-size': sizeFontButtons,
    '--name-days-font-color': colorFontNameDays,
    '--name-days-font-size': sizeFontNameDays,
    '--days-font-color': colorFontDays,
    '--days-font-size': sizeFontDays,
    '--calendar-header-bg': bgHeader,
    '--days-names-bg': bgDaysNames,
    '--calendar-cells-bg': bgCells,
  };
  // Select event handler
  const onSelect = (day) => {
    const currentDate = dayjs(day).format('YYYY-MM-DD');
    const event = eventsData.find((event) => event.date === currentDate);
    setSelectedEvent(event || null);
  };
  // Renders each cell of the calendar
  const cellRender = (day) => (
    <CellRender day={day} eventsData={eventsData} onSelect={onSelect} />
  );

  return (
    <div className="p-6" style={customStyles}>
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
