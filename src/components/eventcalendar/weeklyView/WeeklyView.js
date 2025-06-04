import React from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../CalendarGrid.scss';

// Extend dayjs with ISO week support
dayjs.extend(isoWeek);

// Helper function to generate days for the current week
const generateWeekDays = (currentDate) => {
    const startOfWeek = currentDate.startOf('isoWeek'); // Monday
    const days = [];
    
    for (let i = 0; i < 7; i++) {
        days.push(startOfWeek.add(i, 'day'));
    }
    
    return days;
};

// WeeklyView Component
const WeeklyView = ({ currentDate, cellRender }) => {
    // Use the currentDate prop to determine which week to show
    const currentWeekDate = currentDate || dayjs();
    const weekDays = generateWeekDays(currentWeekDate);

    // Helper function to generate 30-minute intervals like daily view
    const generateHalfHourIntervals = () => {
        const intervals = [];
        for (let i = 0; i < 24; i++) {
            intervals.push({ hour: i, half: false }); // :00
            intervals.push({ hour: i, half: true });  // :30
        }
        return intervals;
    };

    const halfHourIntervals = generateHalfHourIntervals();

    return (
        <div>
            {/* Weekly Calendar Grid */}
            <div className="weekly-calendar-grid">
                {/* Header Row */}
                <div className="week-row">
                    {/* Time Header */}
                    <div className="time-header"></div>
                    
                    {/* Day Headers */}
                    {weekDays.map((day, dayIndex) => (
                        <div key={dayIndex} className="day-header-weekly">
                            <div className="day-name">
                                {day.format('ddd')}
                            </div>
                            <div className={`day-number ${day.isSame(dayjs(), 'day') ? 'current-day' : ''}`}>
                                {day.format('DD')}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Time Rows */}
                {halfHourIntervals.map((interval, intervalIndex) => (
                    <div key={intervalIndex} className="week-row">
                        {/* Hour Column */}
                        <div className="hour-cell">
                            <span>
                                {!interval.half ? `${interval.hour.toString().padStart(2, '0')}:00` : ''}
                            </span>
                        </div>

                        {/* Day Columns */}
                        {weekDays.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={interval.half ? "half-hour-cell" : "day-hour-cell"}
                                data-day={day.format('YYYY-MM-DD')}
                                data-hour={interval.hour}
                                data-half={interval.half}
                            >
                                <div className="cell-container">
                                    {cellRender && cellRender(day, interval)}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyView;