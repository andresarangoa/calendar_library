import React from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../../styles/CalendarGrid.scss';

// Extend dayjs with ISO week support
dayjs.extend(isoWeek);

// Fixed DailyView Component - matches your exact CSS structure
const DailyView = ({ currentDate, cellRender, onDailyEvent }) => {
    // Use the currentDate prop instead of internal state
    const currentDay = currentDate || dayjs();

    // Helper function to generate 30-minute intervals for a day
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
        <div className="daily--calendar__grid">
            {/* Time Column */}
            <div className="daily--calendar__hour-column">
                {/* Header cell to align with day header */}
                <div className="daily--calendar__time-header"></div>

                {/* Time intervals - show time only at hour marks */}
                {halfHourIntervals.map((interval, index) => (
                    <div key={index} className="daily--calendar__hour-cell">
                        <span>
                            {!interval.half ? `${interval.hour.toString().padStart(2, '0')}:00` : ''}
                        </span>
                    </div>
                ))}
            </div>

            {/* Single Day Column */}
            <div className="daily--calendar__day-column">
                {/* Hourly Grid with 30-minute intervals */}
                {halfHourIntervals.map((interval, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={interval.half ? "daily--calendar__half-hour-cell" : "daily--calendar__day-hour-cell"}
                        data-hour={interval.hour}
                        data-half={interval.half}
                    >
                        <div className="cell-container">
                            {cellRender && cellRender(currentDay, interval)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyView;