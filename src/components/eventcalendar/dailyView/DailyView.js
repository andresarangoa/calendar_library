import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../CalendarGrid.scss';
import MonthlyCalendar from '../montlyCalendar/MonthlyCalendar';
import EventCalendar from '../EventCalendar';
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
// New WeeklyView Component
const DayView = ({ cellRender, onDailyEvent }) => {
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
            <div className="daily--calendar__grid">
                {/* Time Column */}
                <div className="daily--calendar__hour-column">
                    {/* Celda vacía para la media hora antes de las 00:00 */}
                    <div className="daily--calendar__hour-cell daily--calendar__empty-cell"></div>
                    <div className="daily--calendar__hour-cell daily--calendar__empty-cell"></div>

                    {/* Intervalos de 30 minutos menos uno al final */}
                    {halfHourIntervals.slice(0, -1).map((interval, index) => (
                        <div key={index} className="daily--calendar__hour-cell">
                            <span>{!interval.half ? `${interval.hour}:00` : ''}</span>
                        </div>
                    ))}
                </div>

                {/* Day Columns */}
                <div className="daily--calendar__container">
                    <div className='daily--calendar__daily-appointments'>
                        {daysOfWeek.map((day, colIndex) => (
                            <div key={colIndex} className="daily--calendar__day-column">
                                <div className="daily--calendar__day-header-daily">
                                    {day.format('ddd, DD')}
                                </div>

                                {/* Hourly Grid with 30-minute intervals */}
                                {halfHourIntervals.map((interval, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className={interval.half ? "daily--calendar__half-hour-cell" : "daily--calendar__day-hour-cell"}
                                    >
                                        {cellRender(day, interval)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='daily--calendar__calendar-pick'>
                        <EventCalendar eventsData={[]} addEvent={() => alert('ring')} title='' styles={customStyles} onSelectedEvent={onDailyEvent} visibilityOptions={visibilityOptions}/>
                   
                </div>
            </div>
        </div>
    );

};

export default DayView;
