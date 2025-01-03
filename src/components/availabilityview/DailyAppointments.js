import React from 'react';
import PropTypes from 'prop-types';
import './DailyAppointments.scss'; // Optional styling

const groupByRows = (array, itemsPerRow) => {
  const grouped = [];
  for (let i = 0; i < array.length; i += itemsPerRow) {
    grouped.push(array.slice(i, i + itemsPerRow));
  }
  return grouped;
};

const DailyAppointments = ({ availability, onTimeSlotSelect }) => {
  const groupedAvailability = groupByRows(availability, 4); // Group into rows of 4

  return (
    <div className="daily-appointments">
      <h3>Select a Time Slot</h3>
      {groupedAvailability.map((row, rowIndex) => (
        <div className="time-slot-row" key={rowIndex}>
          {row.map((timeSlot, index) => (
            <button
              key={index}
              className="time-slot-button"
              onClick={() => onTimeSlotSelect(timeSlot)}
              disabled={!timeSlot.available} // Disable button if slot is unavailable
            >
              {timeSlot.time}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

DailyAppointments.propTypes = {
  availability: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTimeSlotSelect: PropTypes.func.isRequired,
};

export default DailyAppointments;
