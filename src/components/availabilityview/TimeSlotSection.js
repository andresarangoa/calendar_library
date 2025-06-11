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
    <div className="cal-h-full cal-bg-white/5 cal-backdrop-blur-xl cal-p-6 cal-flex 
        cal-flex-col cal-border-r-0 cal-border-l-1 cal-border-t-0 cal-border-b-0 
        cal-border-white/80 cal-border-solid">
      <h3 className="cal-text-lg cal-font-semibold cal-text-gray-800 cal-mb-4">
        {formatDate(selectedDate)}
      </h3>

      {/* Hide scrollbar completely and fix button width */}
      <div
        className="cal-max-h-[530px] cal-overflow-y-auto cal--mr-6 cal-pr-6"
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
        <div className="cal-space-y-2 cal-pr-2">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              onClick={() => onTimeSelect(time)}
              className={`cal-w-full cal-p-3 cal-mx-2 cal-my-2 cal-text-sm cal-font-semibold cal-rounded-lg cal-border cal-transition-all cal-backdrop-blur-sm ${selectedTime === time
                  ? 'cal-bg-purple-600 cal-text-white cal-border-purple-600'
                  : 'cal-bg-white/40 cal-text-gray-700 cal-border-white/30 hover:cal-border-white/50 hover:cal-bg-white/60'
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