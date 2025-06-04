import React from 'react';

const timeSlotsHarcoded = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
    '11:00 PM', '10:00 PM', '9:00 PM', '8:00 PM', '7:00 PM'
];

const TimeSlotSection = ({ selectedDate, onTimeSelect, selectedTime, timeSlots = timeSlotsHarcoded }) => {
    const formatDate = (date) => {
      if (!date) return '';
      const options = { weekday: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
  
    return (
      <div className="h-full bg-white/5 backdrop-blur-xl p-6 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {formatDate(selectedDate)}
        </h3>
        
        {/* Hide scrollbar completely and fix button width */}
        <div 
          className="max-h-[530px] overflow-y-auto -mr-6 pr-6"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
          <div className="space-y-2 pr-2">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => onTimeSelect(time)}
                className={`w-full p-3 text-sm font-medium rounded-lg border transition-all backdrop-blur-sm ${
                  selectedTime === time
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white/40 text-gray-700 border-white/30 hover:border-white/50 hover:bg-white/60'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
};

export default TimeSlotSection;