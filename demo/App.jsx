import React from 'react';
import { createRoot } from 'react-dom/client';
import { EventCalendar, AvailabilityView } from '../src';
import '../assets/style.scss'

// Sample event data
const defaultEventsData = [
  { date: '2024-12-03', title: 'MINOXIDIL TREATMENT', time: '10:00', endTime: '11:00', numberEvents: 2 },
  { date: '2024-12-02', title: 'Sales meeting', time: '14:00', endTime: '15:30' },
  { date: '2024-12-04', title: 'Sam\'s birthday party', time: '14:00', endTime: '17:00' },
  { date: '2024-12-28', title: 'Date night', time: '18:00', endTime: '20:00' },
  { date: '2024-12-28', title: 'Hockey game', time: '19:00', endTime: '21:00' },
  { date: '2024-12-22', title: 'Maple syrup museum', time: '15:00', endTime: '16:30' },
  { date: '2024-12-30', title: 'Cinema with friends', time: '21:00', endTime: '23:00' }
];

const customStyles = {
  bgActualDay: '#1376f4',

};

const visibilityOptions = {
  filters: {
    yearly: false,
    monthly: true,
    weekly: true,
    daily: true,
  },
}

function App() {
  return (
    <>
      <div className='container'>
        <EventCalendar eventsData={defaultEventsData} addEvent={() => alert('ring')}
          styles={customStyles} onSelectedEvent={(event) => alert(event.title)} onDailyEvent={(event) => alert("little month", event)} visibilityOptions={visibilityOptions} />

      </div>
      <div className="container">
        <AvailabilityView />
      </div>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
