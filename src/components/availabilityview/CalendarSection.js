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
      <div className="h-full bg-white/5 backdrop-blur-xl p-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 bg-transparent hover:shadow-lg rounded-lg transition-all"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 bg-transparent hover:shadow-lg rounded-lg transition-all"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
  
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Week day headers */}
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-900 py-3">
              {day}
            </div>
          ))}
  
          {/* Calendar days */}
          {days.map((day, index) => (
            <div key={index} className="aspect-square flex items-center justify-center">
              {day && (
                <button
                  onClick={() => handleDateClick(day)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-all relative ${
                    selectedDate && selectedDate.getDate() === day && 
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? 'bg-gray-900 text-white'
                      : 'bg-transparent text-gray-700 hover:border hover:border-gray-300'
                  }`}
                >
                  {day}
                  {day === 14 && (
                    <div className="absolute bottom-1 w-1 h-1 bg-gray-400 rounded-full"></div>
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