import React from 'react';
import { createRoot } from 'react-dom/client';
import { EventCalendar } from '../src';
// import { EventCalendar } from '../dist/components/eventcalendar/EventCalendar';

// Sample event data
const defaultEventsData = [
  { date: '2024-10-03', title: 'Design review', time: '10AM' },
  { date: '2024-10-03', title: 'Sales meeting', time: '2PM' },
  { date: '2024-10-05', title: 'Sam\'s birthday party', time: '2PM' },
  { date: '2024-10-07', title: 'Date night', time: '6PM' },
  { date: '2024-10-09', title: 'Hockey game', time: '7PM' },
  { date: '2024-10-22', title: 'Maple syrup museum', time: '3PM' },
  { date: '2024-10-30', title: 'Cinema with friends', time: '9PM' }
];


function App() {
  return (
    <div style={{ padding: '0 100px' }}>
      <EventCalendar eventsData={defaultEventsData} addEvent={()=> alert('ring')}  onSelectedEvent={(event)=> alert(event.title)} />

    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
