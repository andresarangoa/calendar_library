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

export default function EventCalendar({
  eventsData = [],
  styles = defaultStyles,
  title = 'Event Calendar',
  titleButton = 'Add Event',
  onSelectedEvent = () => {},
  addEvent = () => {},
}) {
  // Destructure and provide default values from styles
  const {
    colorActualDay = '',
    colorFontTitle = '',
    colorFontButtons = '',
    colorFontNameDays = '',
    colorFontDays = '',
    sizeFontAppointment = '',
    sizeFontButtons = '',
    sizeFontNameDays = '',
    sizeFontDays = '',
    bgHeader = '',
    bgDaysNames = '',
    bgCells = '',
    bgActualDay = '',
  } = styles;

  // Create custom CSS variables for styling
  const customStyles = {
    '--current-day-bg': bgActualDay,
    '--current-day-color': colorActualDay,
    '--event-title-color': colorFontTitle,
    '--event-title-font-size': sizeFontAppointment,
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
  const handleSelectEvent = (day) => {
    const formattedDate = dayjs(day).format('YYYY-MM-DD');
    const event = eventsData.find((event) => event.date === formattedDate) || null;
    onSelectedEvent(event);
  };

  // Renders each cell of the calendar
  const renderCell = (day) => (
    <CellRender day={day} eventsData={eventsData} onSelect={handleSelectEvent} />
  );

  return (
    <div className="p-6" style={customStyles}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <CalendarGrid
        cellRender={renderCell}
        titleButton={titleButton}
        onAddEventClicked={addEvent}
      />
    </div>
  );
}
