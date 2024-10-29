import React from 'react';
import { createRoot } from 'react-dom/client';
import { EventCalendar } from '../src';
// import { EventCalendar } from '../dist/components/eventcalendar/EventCalendar';

// Sample event data
const defaultEventsData = [
  { date: '2024-10-03', title: 'Design review', time: '10:00', endTime: '11:00' },
  { date: '2024-10-03', title: 'Sales meeting', time: '14:00', endTime: '15:30' },
  { date: '2024-10-05', title: 'Sam\'s birthday party', time: '14:00', endTime: '17:00' },
  { date: '2024-10-28', title: 'Date night', time: '18:00', endTime: '20:00' },
  { date: '2024-10-28', title: 'Hockey game', time: '19:00', endTime: '21:00' },
  { date: '2024-10-22', title: 'Maple syrup museum', time: '15:00', endTime: '16:30' },
  { date: '2024-10-30', title: 'Cinema with friends', time: '21:00', endTime: '23:00' }
];



function App() {
  return (
    <div style={{ padding: '0 100px' }}>
      <EventCalendar eventsData={defaultEventsData} addEvent={()=> alert('ring')}  onSelectedEvent={(event)=> alert(event.title)} hiddenViews={['yearly']} />

    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
