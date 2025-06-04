import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarSection = ({ onDateSelect, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 15)); // May 15, 2025
  
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  
    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
  
      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
      }
      
      return days;
    };
  
    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + direction);
      setCurrentDate(newDate);
    };
  
    const handleDateClick = (day) => {
      if (day) {
        const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        onDateSelect(selectedDateObj);
      }
    };
  
    const days = getDaysInMonth(currentDate);
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
    return (
      <div className="cal-h-full cal-bg-white/5 cal-backdrop-blur-xl cal-p-8">
        {/* Calendar Header */}
        <div className="cal-flex cal-items-center cal-justify-between cal-mb-8">
          <h2 className="cal-text-xl cal-font-medium cal-text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="cal-flex cal-items-center cal-gap-1">
            <button 
              onClick={() => navigateMonth(-1)}
              className="cal-p-2 cal-bg-transparent hover:cal-shadow-lg cal-rounded-lg cal-transition-all"
            >
              <ChevronLeft size={16} className="cal-text-gray-600" />
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="cal-p-2 cal-bg-transparent hover:cal-shadow-lg cal-rounded-lg cal-transition-all"
            >
              <ChevronRight size={16} className="cal-text-gray-600" />
            </button>
          </div>
        </div>
  
        {/* Calendar Grid */}
        <div className="cal-grid cal-grid-cols-7 cal-gap-2">
          {/* Week day headers */}
          {weekDays.map((day) => (
            <div key={day} className="cal-text-center cal-text-sm cal-font-medium cal-text-gray-900 cal-py-3">
              {day}
            </div>
          ))}
  
          {/* Calendar days */}
          {days.map((day, index) => (
            <div key={index} className="cal-aspect-square cal-flex cal-items-center cal-justify-center">
              {day && (
                <button
                  onClick={() => handleDateClick(day)}
                  className={`cal-w-10 cal-h-10 cal-flex cal-items-center cal-justify-center cal-text-sm cal-font-medium cal-rounded-full cal-transition-all cal-relative ${
                    selectedDate && selectedDate.getDate() === day && 
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? 'cal-bg-gray-900 cal-text-white'
                      : 'cal-bg-transparent cal-text-gray-700 hover:cal-border hover:cal-border-gray-300'
                  }`}
                >
                  {day}
                  {day === 14 && (
                    <div className="cal-absolute cal-bottom-1 cal-w-1 cal-h-1 cal-bg-gray-400 cal-rounded-full"></div>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CalendarSection;