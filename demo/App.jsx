import React from 'react';
import { createRoot } from 'react-dom/client';
import { EventCalendar } from '../src/components/eventcalendar/EventCalendar';
// import { EventCalendar } from '../dist/components/eventcalendar/EventCalendar';

const eventsData = [
  { id: 1, title: 'Design review', date: '2022-01-03', time: '10AM' },
  { id: 2, title: 'Sales meeting', date: '2022-01-03', time: '2PM' },
];

function App() {
  return (
    <div style={{ padding: '0 100px' }}>
        <EventCalendar eventsData={eventsData} />

    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
