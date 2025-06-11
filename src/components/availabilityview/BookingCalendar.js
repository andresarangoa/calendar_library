// BookingCalendar.jsx
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

import BookingForm from "./Form/BookingForm";
import CalendarSection from "./CalendarSection";
import TimeSlotSection from "./TimeSlotSection";
import ProfileSection from "./ProfileSection";
import { defaultAvailability, defaultProfile, toJSDate, mergeClasses } from "./utils";

/* ──────────────────────────────────────────────────────────── */
/* Main component                                              */
/* ──────────────────────────────────────────────────────────── */
const BookingCalendar = ({
  /* External inputs */
  date: externalDate,
  time: externalTime,
  availability = defaultAvailability,
  profileInfo = defaultProfile,
  handleTimeSlotSelect = () => {},

  /* Navigation & form customization */
  onGoBack,
  CustomForm = BookingForm,
  handleFormSubmit,
  initialValues = {
    name: "",
    phone: "",
    email: "",
    date: externalDate,
    time: externalTime
  },

  /* NEW: Styling and customization props (all optional) */
  theme = {},
  customClasses = {},
  layout = {
    profileCols: 3,
    calendarCols: 6,
    timeSlotsCols: 3
  },
  animations = {
    enabled: true,
    duration: "cal-transition-all",
    easing: "cal-ease-in-out"
  },
  
  /* Component-specific customizations */
  calendarProps = {},
  timeSlotProps = {},
  profileProps = {},
  formProps = {},
  
  /* Advanced customization */
  onDateChange,
  onTimeChange,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  validationRules = {}
}) => {
  /* Internal state mirrors (and sanitizes) external props */
  const [selectedDate, setSelectedDate] = useState(toJSDate(externalDate));
  const [selectedTime, setSelectedTime] = useState(externalTime ?? null);
  const [showForm, setShowForm] = useState(
    Boolean(externalDate && externalTime)
  );

  /* Keep in sync if parent later changes props */
  useEffect(() => setSelectedDate(toJSDate(externalDate)), [externalDate]);
  useEffect(() => setSelectedTime(externalTime ?? null), [externalTime]);

  /* Normalize availability: allow [{time, available}] or ["10:00 AM"] */
  const timeSlots = Array.isArray(availability)
    ? availability[0]?.time
      ? availability.filter((s) => s.available !== false).map((s) => s.time)
      : availability
    : defaultAvailability;

  /* ───── Callbacks ───── */
  const handleDateSelect = useCallback((dateLike) => {
    const jsDate = toJSDate(dateLike);
    setSelectedDate(jsDate);
    onDateChange?.(jsDate);
    if (selectedTime) setShowForm(true);
  }, [selectedTime, onDateChange]);

  const handleTimeSelect = useCallback((time) => {
    setSelectedTime(time);
    handleTimeSlotSelect(time);
    onTimeChange?.(time);
    if (selectedDate) setShowForm(true);
  }, [selectedDate, handleTimeSlotSelect, onTimeChange]);

  const handleBack = () => {
    setShowForm(false);
    onGoBack?.();
  };

  const handleConfirm = (formData) => {
    const booking = { ...formData, date: selectedDate, time: selectedTime };
    if (handleFormSubmit) handleFormSubmit(booking);
    setShowForm(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  /* ───── Render ───── */
  return (
    <div className={mergeClasses(
      "cal-min-h-screen cal-flex cal-items-center cal-justify-center cal-p-4",
      customClasses.wrapper
    )}>
      <div className={mergeClasses(
        "cal-w-full cal-max-w-7xl cal-bg-white/10 cal-backdrop-blur-xl cal-rounded-3xl cal-shadow-2xl cal-overflow-hidden cal-border-2 cal-border-white/50 cal-border-solid",
        customClasses.container,
        animations.enabled && animations.duration
      )}>
        <div className={mergeClasses("cal-min-h-[630px]", customClasses.inner)}>
          {showForm ? (
            <CustomForm
              profileInfo={profileInfo}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={handleBack}
              onConfirm={handleConfirm}
              initialValues={initialValues}
              theme={theme}
              customClasses={customClasses.form || {}}
              validation={validationRules}
              {...formProps}
            />
          ) : (
            <div className={mergeClasses(
              "cal-grid cal-grid-cols-12 cal-h-full",
              customClasses.grid
            )}>
              {/* Profile section */}
              <div className={mergeClasses(
                `cal-col-span-${layout.profileCols}`,
                customClasses.profile
              )}>
                <ProfileSection 
                  {...profileInfo}
                  theme={theme}
                  customClasses={customClasses.profileSection || {}}
                  animations={animations}
                  {...profileProps}
                />
              </div>

              {/* Calendar section */}
              <div className={mergeClasses(
                `cal-col-span-${layout.calendarCols}`,
                customClasses.calendar
              )}>
                <CalendarSection
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  theme={theme}
                  customClasses={customClasses.calendarSection || {}}
                  animations={animations}
                  minDate={minDate}
                  maxDate={maxDate}
                  highlightedDates={highlightedDates}
                  shouldDisableDate={(date) => {
                    return disabledDates.some(d => 
                      d.getDate() === date.getDate() &&
                      d.getMonth() === date.getMonth() &&
                      d.getFullYear() === date.getFullYear()
                    );
                  }}
                  {...calendarProps}
                />
              </div>

              {/* Time slots section */}
              <div className={mergeClasses(
                `cal-col-span-${layout.timeSlotsCols}`,
                customClasses.timeSlots
              )}>
                <TimeSlotSection
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  timeSlots={timeSlots}
                  theme={theme}
                  customClasses={customClasses.timeSlotsSection || {}}
                  animations={animations}
                  {...timeSlotProps}
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