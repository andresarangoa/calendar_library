import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../styles/CalendarGrid.scss';
import MonthlyCalendar from '../eventcalendar/montlyCalendar/MonthlyCalendar';
import { EventCalendar } from '../';
import DailyAppointments from './DailyAppointments';
import ProfileHeader from './ProfileHeader';
// Extend dayjs with ISO week support
dayjs.extend(isoWeek);

// Helper function to generate days for the current week
const generateWeekDays = (startOfWeek) => {
    const days = [];
    let day = startOfWeek.clone();
    days.push(day);
    day = day.add(1, 'day');
    return days;
};

const customStyles = {
    bgActualDay: '#1376f4',
};

const availabilityList = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
];

const visibilityOptions = {
    todayButton: true,
    dropdownFilter: false,
    addEventButton: false,
    header: false,
    daysNames: true,
    filters: {
        yearly: false,
        daily: false,

    }
}

const defaultProfileInfo = {
    image: "https://avatars.githubusercontent.com/u/146370544?v=4",
    name: "John Doe",
    subtitle: "Fitness Coach",
    shortText: "Helping you reach your fitness goals."
}
// New WeeklyView Component
const AvailabilityView = ({ availability = availabilityList, profileInfo = defaultProfileInfo, onDailyEvent, handleTimeSlotSelect = (timeSlot) => { alert(`You selected: ${timeSlot.time}`); } }) => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
    const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('isoWeek'));
    const daysOfWeek = generateWeekDays(currentWeek);


    // Helper function to generate 30-minute intervals for a day
    const generateHalfHourIntervals = () => {
        const intervals = [];
        for (let i = 0; i < 24; i++) {
            intervals.push({ hour: i, half: false });
            intervals.push({ hour: i, half: true });
        }
        return intervals;
    };

    const halfHourIntervals = generateHalfHourIntervals();

    const handlePrevWeek = () => setCurrentWeek(currentWeek.subtract(1, 'week'));
    const handleNextWeek = () => setCurrentWeek(currentWeek.add(1, 'week'));
    const handleToday = () => setCurrentWeek(dayjs().startOf('isoWeek'));
    return (
        <div>
            {/* Weekly Calendar Grid */}
            <div className="calendar--public">
                {/* Time Column */}
                <div className="calendar--public--first-column">
                    <ProfileHeader
                        image={profileInfo.image}// Replace with actual image URL
                        name={profileInfo.name}
                        subtitle={profileInfo.subtitle}
                        shortText={profileInfo.shortText}
                    />
                </div>

                <div className="calendar--public--second-column">
                    <EventCalendar eventsData={[]} addEvent={() => alert('ring')} title='' styles={customStyles} onSelectedEvent={onDailyEvent} visibilityOptions={visibilityOptions} />
                </div>

                {/* Day Columns */}
                <div className="daily-container">
                    <div className='daily-appointments'>
                        <DailyAppointments
                            availability={availability}
                            onTimeSlotSelect={handleTimeSlotSelect}
                        />
                    </div>
                </div>

            </div>
        </div>
    );

};

export default AvailabilityView;
