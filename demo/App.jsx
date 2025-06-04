import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EventCalendar, AvailabilityView } from '../src';
// import {  AvailabilityView } from '../dist'
import '../assets/style.scss'
import dayjs from 'dayjs';
// Sample event data
const defaultEventsData = [
  // — June 02 —
  { date: '2025-06-02', title: 'Sales meeting', time: '14:00', endTime: '15:30', color: '#3b82f6' },

  // — June 03 —
  { date: '2025-06-03', title: 'MINOXIDIL TREATMENT', time: '10:00', endTime: '11:00', numberEvents: 2, color: '#8b5cf6' },

  // — June 04 —
  { date: '2025-06-04', title: "Sam's birthday party", time: '14:00', endTime: '17:00', color: '#ef4444' },
  { date: '2025-06-04', title: 'Sunrise jog', time: '06:00', endTime: '06:45', color: '#10b981' },
  { date: '2025-06-04', title: 'Breakfast & planning', time: '07:00', endTime: '07:45', color: '#3b82f6' },
  { date: '2025-06-04', title: 'Content-ideation sprint', time: '08:00', endTime: '08:45', color: '#ca0f70' },
  { date: '2025-06-04', title: 'Lunch with mentor', time: '12:30', endTime: '13:30', color: '#f59e0b' },   // kept
  { date: '2025-06-04', title: 'Quick e-mail sweep', time: '17:15', endTime: '17:45', color: '#8b5cf6' },
  { date: '2025-06-04', title: 'Night stretching & wind-down', time: '20:00', endTime: '20:30', color: '#10b981' },

  // — June 22 —
  { date: '2025-06-22', title: 'Maple syrup museum', time: '15:00', endTime: '16:30', color: '#ca0f70' },

  // — June 28 —
  { date: '2025-06-28', title: 'Sunrise yoga', time: '06:30', endTime: '07:15', color: '#10b981' },   // kept
  { date: '2025-06-28', title: 'Gym session', time: '07:30', endTime: '08:30', color: '#f59e0b' },
  { date: '2025-06-28', title: 'Investor follow-up e-mails', time: '13:00', endTime: '13:45', color: '#ef4444' },
  { date: '2025-06-28', title: 'Content shoot with Angel', time: '14:00', endTime: '15:30', color: '#8b5cf6' },
  { date: '2025-06-28', title: 'Coffee with new prospect', time: '16:00', endTime: '16:45', color: '#3b82f6' },
  { date: '2025-06-28', title: 'Pre-event wardrobe prep', time: '17:00', endTime: '17:30', color: '#ca0f70' },
  { date: '2025-06-28', title: 'Date night', time: '18:00', endTime: '20:00', color: '#ca0f70' },   // kept
  { date: '2025-06-28', title: 'Hockey game', time: '19:00', endTime: '21:00', color: '#3b82f6' },

  // — June 30 —
  { date: '2025-06-30', title: 'Cinema with friends', time: '21:00', endTime: '23:00', color: '#8b5cf6' }
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
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTime(timeSlot.time);
    setSelectedDate(dayjs().format('YYYY-MM-DD')); // Assuming the current date
    console.log('Time Slot Selected:', timeSlot);
  };
  return (
    <div>
      <div className='container'>
        <EventCalendar eventsData={defaultEventsData} addEvent={() => alert('ring')}
          styles={customStyles} onSelectedEvent={(event) => alert(event.title)} onDailyEvent={(event) => alert("little month", event)} visibilityOptions={visibilityOptions} />

      </div>
      <div className="container">
        <AvailabilityView date={selectedDate} time={selectedTime} handleTimeSlotSelect={handleTimeSlotSelect} />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
