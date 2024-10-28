import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../CalendarGrid.scss';
import MonthlyCalendar from '../montlyCalendar/MonthlyCalendar';
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

// New WeeklyView Component
const DayView = ({ cellRender, montlyRenderCell}) => {
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
            <div className="daily-calendar-grid">
                {/* Time Column */}
                <div className="hour-column">
                    {/* Celda vacía para la media hora antes de las 00:00 */}
                    <div className="hour-cell empty-cell"></div>
                    <div className="hour-cell empty-cell"></div>

                    {/* Intervalos de 30 minutos menos uno al final */}
                    {halfHourIntervals.slice(0, -1).map((interval, index) => (
                        <div key={index} className="hour-cell">
                            <span>{!interval.half ? `${interval.hour}:00` : ''}</span>
                        </div>
                    ))}
                </div>

                {/* Day Columns */}
                <div className="daily-container">
                    <div className='daily-appointments'>
                        {daysOfWeek.map((day, colIndex) => (
                            <div key={colIndex} className="day-column">
                                <div className="day-header-daily">
                                    {day.format('ddd, DD')}
                                </div>

                                {/* Hourly Grid with 30-minute intervals */}
                                {halfHourIntervals.map((interval, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className={interval.half ? "half-hour-cell" : "day-hour-cell"}
                                    >
                                        {cellRender(day, interval)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='calendar-pick'>
                        <MonthlyCalendar currentMonth={currentMonth} cellRender={montlyRenderCell}   size={{ width: '10px', height: '700px' }} />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DayView;
