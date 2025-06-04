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
    <div className="h-full">
      {/* Back Button - Top of form */}
      <div className="p-6 border-b border-white/20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all font-medium"
        >
          <ArrowLeft size={18} />
          Back to Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Panel - Meeting Details */}
        <div className="p-8 lg:p-12 flex flex-col justify-between bg-white/10 border-r border-white/20">
          <div>

            {/* Logo and Brand */}
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black rounded-sm"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-8">Columbia Exclusive</h2>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
              Meeting with Roy Taylor
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Non quam aliquam eu turpis tristique sollicitudin viverra.
            </p>

            {/* Meeting Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <Clock size={20} />
                <span className="font-medium">30mins</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar size={20} />
                <span className="font-medium">{formatDate(selectedDate)}</span>
              </div>
              {selectedTime && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={20} />
                  <span className="font-medium">{selectedTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Copy Link Button */}
          <button className="flex items-center justify-center gap-1 w-40 py-1.5 bg-white/20 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all font-medium text-sm shadow-md shadow-black/10">
            <Copy size={14} />
            Copy Link
          </button>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 lg:p-12 bg-white/5">
          <div className="h-full flex flex-col">
            <div className="flex-1 space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-500"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-500 resize-none"
                />
              </div>
            </div>

            {/* Terms and Actions */}
            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-6">
                By proceeding, you agree to our{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700">Terms</a>
                {' '}and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-white/60 border border-white/30 rounded-xl text-gray-700 font-medium hover:bg-white/80 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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