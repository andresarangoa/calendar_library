import React, { useState } from 'react';
import { Clock, Copy, Calendar, ArrowLeft } from 'lucide-react';
import ProfileSectionMeeting from '../ProfileSectionMeeting';

const BookingForm = ({ profileInfo, selectedDate, selectedTime, onBack, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      onConfirm(formData);
    }
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className="cal-grid  cal-min-h-[610px] cal-grid-cols-1 lg:cal-grid-cols-3 cal-h-full ">
      {/* Left Panel - Meeting Details */}
      <div className="cal-col-span-1 cal-h-full">
        <ProfileSectionMeeting {...profileInfo} selectedDate={formatDate(selectedDate)} />
      </div>


      {/* Right Panel - Form */}
      <div className="cal-py-12 lg:cal-p-12 cal-bg-white/5 cal-col-span-2">
        <div className="cal-h-full cal-flex cal-flex-col cal-mx-24 ">
          <div className="cal-flex-1 cal-space-y-6 ">
            {/* Name Field */}
            <div>
              <label className="cal-block cal-text-sm cal-font-semibold cal-text-gray-700 cal-mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                className="cal-w-full cal-px-4 cal-py-3 cal-bg-white/80 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="cal-block cal-text-sm cal-font-semibold cal-text-gray-700 cal-mb-2">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                className="cal-w-full cal-px-4 cal-py-3 cal-bg-white/80 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="cal-block cal-text-sm cal-font-semibold cal-text-gray-700 cal-mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                rows={4}
                className="cal-w-full cal-px-4 cal-py-3 cal-bg-white/80 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500 cal-resize-none"
              />
            </div>
          </div>

          {/* Terms and Actions */}
          <div className="cal-flex cal-gap-4 cal-items-center">
            {/* Terms text - takes 40% */}
            <p className="cal-w-2/5 cal-text-sm cal-text-gray-600">
              By proceeding, you agree to our{' '}
              <a href="#" className="cal-text-purple-600 hover:cal-text-purple-700">Terms</a>
              {' '}and{' '}
              <a href="#" className="cal-text-purple-600 hover:cal-text-purple-700">Privacy Policy</a>
            </p>

            {/* Empty space - takes 20% */}
            <div className="cal-w-1/5"></div>

            {/* Back button - small fixed width */}
            <button
              onClick={onBack}
              className="cal-w-16 cal-px-2 cal-py-4 cal-bg-white/60 cal-border cal-border-white/30 cal-rounded-xl cal-text-gray-700 cal-font-medium cal-bg-white/80 hover:cal-bg-white/80 cal-transition-all cal-text-xs"
            >
              Back
            </button>

            {/* Confirm button - takes remaining space */}
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email}
              className="cal-flex-1 cal-py-4 cal-bg-gray-800 cal-text-white cal-rounded-xl cal-font-medium hover:cal-bg-gray-900 cal-transition-all cal-disabled:opacity-50 cal-disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;