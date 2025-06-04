import React, { useState } from 'react';
import { Clock, Copy, Calendar, ArrowLeft } from 'lucide-react';

const BookingForm = ({ selectedDate, selectedTime, onBack, onConfirm }) => {
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
    <div className="cal-h-full">
      {/* Back Button - Top of form */}
      <div className="cal-p-6 cal-border-b cal-border-white/20">
        <button
          onClick={onBack}
          className="cal-flex cal-items-center cal-gap-2 cal-px-4 cal-py-2 cal-bg-white/20 cal-backdrop-blur-sm cal-border cal-border-white/30 cal-rounded-xl cal-text-white hover:cal-bg-white/30 cal-transition-all cal-font-medium"
        >
          <ArrowLeft size={18} />
          Back to Calendar
        </button>
      </div>

      <div className="cal-grid cal-grid-cols-1 lg:cal-grid-cols-2 cal-h-full">
        {/* Left Panel - Meeting Details */}
        <div className="cal-p-8 lg:cal-p-12 cal-flex cal-flex-col cal-justify-between cal-bg-white/10 cal-border-r cal-border-white/20">
          <div>

            {/* Logo and Brand */}
            <div className="cal-w-16 cal-h-16 cal-bg-black cal-rounded-full cal-flex cal-items-center cal-justify-center cal-mb-4">
              <div className="cal-w-8 cal-h-8 cal-bg-white cal-rounded-full cal-flex cal-items-center cal-justify-center">
                <div className="cal-w-4 cal-h-4 cal-border-2 cal-border-black cal-rounded-sm"></div>
              </div>
            </div>
            <h2 className="cal-text-xl cal-font-bold cal-text-gray-800 cal-mb-8">Columbia Exclusive</h2>
            
            <h1 className="cal-text-3xl cal-font-bold cal-text-gray-800 cal-mb-4 cal-leading-tight">
              Meeting with Roy Taylor
            </h1>
            <p className="cal-text-gray-600 cal-mb-8 cal-leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Non quam aliquam eu turpis tristique sollicitudin viverra.
            </p>

            {/* Meeting Details */}
            <div className="cal-space-y-4 cal-mb-8">
              <div className="cal-flex cal-items-center cal-gap-3 cal-text-gray-700">
                <Clock size={20} />
                <span className="cal-font-medium">30mins</span>
              </div>
              <div className="cal-flex cal-items-center cal-gap-3 cal-text-gray-700">
                <Calendar size={20} />
                <span className="cal-font-medium">{formatDate(selectedDate)}</span>
              </div>
              {selectedTime && (
                <div className="cal-flex cal-items-center cal-gap-3 cal-text-gray-700">
                  <Clock size={20} />
                  <span className="cal-font-medium">{selectedTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Copy Link Button */}
          <button className="cal-flex cal-items-center cal-justify-center cal-gap-1 cal-w-40 cal-py-1.5 cal-bg-white/20 cal-rounded-lg cal-text-gray-600 hover:cal-text-gray-800 hover:cal-bg-white/30 cal-transition-all cal-font-medium cal-text-sm cal-shadow-md cal-shadow-black/10">
            <Copy size={14} />
            Copy Link
          </button>
        </div>

        {/* Right Panel - Form */}
        <div className="cal-p-8 lg:cal-p-12 cal-bg-white/5">
          <div className="cal-h-full cal-flex cal-flex-col">
            <div className="cal-flex-1 cal-space-y-6">
              {/* Name Field */}
              <div>
                <label className="cal-block cal-text-sm cal-font-medium cal-text-gray-700 cal-mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter name"
                  className="cal-w-full cal-px-4 cal-py-3 cal-bg-white/60 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="cal-block cal-text-sm cal-font-medium cal-text-gray-700 cal-mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email"
                  className="cal-w-full cal-px-4 cal-py-3 cal-bg-white/60 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="cal-block cal-text-sm cal-font-medium cal-text-gray-700 cal-mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description"
                  rows={4}
                  className="cal-w-full cal-px-4 cal-py-3 cal-bg-white/60 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500 cal-resize-none"
                />
              </div>
            </div>

            {/* Terms and Actions */}
            <div className="cal-mt-8">
              <p className="cal-text-sm cal-text-gray-600 cal-mb-6">
                By proceeding, you agree to our{' '}
                <a href="#" className="cal-text-purple-600 hover:cal-text-purple-700">Terms</a>
                {' '}and{' '}
                <a href="#" className="cal-text-purple-600 hover:cal-text-purple-700">Privacy Policy</a>
              </p>

              {/* Action Buttons */}
              <div className="cal-flex cal-gap-4">
                <button
                  onClick={onBack}
                  className="cal-px-6 cal-py-3 cal-bg-white/60 cal-border cal-border-white/30 cal-rounded-xl cal-text-gray-700 cal-font-medium hover:cal-bg-white/80 cal-transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email}
                  className="cal-flex-1 cal-px-6 cal-py-3 cal-bg-gray-800 cal-text-white cal-rounded-xl cal-font-medium hover:cal-bg-gray-900 cal-transition-all cal-disabled:opacity-50 cal-disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default BookingForm;