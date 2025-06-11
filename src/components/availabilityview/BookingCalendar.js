// BookingCalendar.jsx
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

import BookingForm from "./Form/BookingForm";   // default form
import CalendarSection from "./CalendarSection";
import TimeSlotSection from "./TimeSlotSection";
import ProfileSection from "./ProfileSection";

/* ──────────────────────────────────────────────────────────── */
/* Fallback data                                               */
/* ──────────────────────────────────────────────────────────── */
const fallbackAvailability = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const fallbackProfile = {
  image: "https://avatars.githubusercontent.com/u/146370544?v=4",
  name: "John Doe",
  service: "EVO Introduction Call",
  subtitle: "Fitness Coach",
  meetingLink: "https://example.com",
  meetingLongTime: "30 minutes",
  shortText: "Helping you reach your fitness goals."
};

/* ──────────────────────────────────────────────────────────── */
/* Helper: always return a JS Date (or null)                   */
/* ──────────────────────────────────────────────────────────── */
const toJSDate = (d) =>
  d ? (d instanceof Date ? d : dayjs(d).toDate()) : null;

/* ──────────────────────────────────────────────────────────── */
/* Main component                                              */
/* ──────────────────────────────────────────────────────────── */
const BookingCalendar = ({
  /* external inputs */
  date: externalDate,
  time: externalTime,
  availability = fallbackAvailability,
  profileInfo = fallbackProfile,
  handleTimeSlotSelect = () => { },

  /* navigation & form customisation */
  onGoBack,
  CustomForm = BookingForm,
  handleFormSubmit,
  initialValues = {
    name: "",
    phone: "",
    email: "",
    date: externalDate,
    time: externalTime
  }
}) => {
  /* internal state mirrors (and sanitises) external props */
  const [selectedDate, setSelectedDate] = useState(toJSDate(externalDate));
  const [selectedTime, setSelectedTime] = useState(externalTime ?? null);
  const [showForm, setShowForm] = useState(
    Boolean(externalDate && externalTime)
  );

  /* keep in sync if parent later changes props */
  useEffect(() => setSelectedDate(toJSDate(externalDate)), [externalDate]);
  useEffect(() => setSelectedTime(externalTime ?? null), [externalTime]);

  /* normalise availability: allow [{time, available}] or ["10:00 AM"] */
  const timeSlots = Array.isArray(availability)
    ? availability[0]?.time
      ? availability.filter((s) => s.available !== false).map((s) => s.time)
      : availability
    : fallbackAvailability;

  /* ───── callbacks ───── */
  const handleDateSelect = useCallback((dateLike) => {
    const jsDate = toJSDate(dateLike);
    setSelectedDate(jsDate);
    if (selectedTime) setShowForm(true);
  }, [selectedTime]);

  const handleTimeSelect = useCallback((time) => {
    setSelectedTime(time);
    handleTimeSlotSelect(time);
    if (selectedDate) setShowForm(true);
  }, [selectedDate, handleTimeSlotSelect]);

  const handleBack = () => {
    setShowForm(false);
    onGoBack?.();                 // call only if provided
  };

  const handleConfirm = (formData) => {
    const booking = { ...formData, date: selectedDate, time: selectedTime };
    if (handleFormSubmit) handleFormSubmit(booking);
    setShowForm(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  /* ───── render ───── */
  return (
    <div className="cal-min-h-screen cal-flex cal-items-center cal-justify-center cal-p-4 ">
      <div className="cal-w-full cal-max-w-7xl cal-bg-white/10 cal-backdrop-blur-xl
       cal-rounded-3xl cal-shadow-2xl cal-overflow-hidden cal-border-2 cal-border-white/50 cal-border-solid">
        <div className="cal-min-h-[610px]">
          {showForm ? (
            <CustomForm
              profileInfo={profileInfo}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={handleBack}
              onConfirm={handleConfirm}
              initialValues={initialValues}
            />
          ) : (
            <div className="cal-grid cal-grid-cols-12 cal-h-full ">
              {/* profile (3/12) */}
              <div className="cal-col-span-3 ">
                <ProfileSection {...profileInfo} />
              </div>

              {/* calendar (6/12) */}
              <div className="cal-col-span-6 ">
                <CalendarSection
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* slots (3/12) */}
              <div className="cal-col-span-3">
                <TimeSlotSection
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  timeSlots={timeSlots}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;