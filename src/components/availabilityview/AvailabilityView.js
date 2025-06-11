// AvailabilityView.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "../styles/CalendarGrid.scss";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./Form/BookingForm";
import { defaultAvailability, defaultProfile } from "./utils";

dayjs.extend(isoWeek);

/* ───────────────────────────────────────────────────────────── */
/* Main component                                                */
/* ───────────────────────────────────────────────────────────── */
const AvailabilityView = ({
  date: externalDate,
  time: externalTime,
  availability = defaultAvailability,
  profileInfo = defaultProfile,
  onGoBack,
  handleTimeSlotSelect = (t) => console.log(`Selected time: ${t}`),
  CustomForm = BookingForm,
  handleFormSubmit,
  initialValues = {
    name: "",
    phone: "",
    email: "",
    date: externalDate,
    time: externalTime,
  },
  
  // Optional customization props - pass any of these to customize
  theme,
  customClasses,
  layout,
  animations,
  calendarProps,
  timeSlotProps,
  profileProps,
  formProps,
  onDateChange,
  onTimeChange,
  minDate,
  maxDate,
  disabledDates,
  highlightedDates,
  validationRules
}) => {
  /* Local state stays in sync with incoming props */
  const [selectedDate, setSelectedDate] = useState(externalDate ?? null);
  const [selectedTime, setSelectedTime] = useState(externalTime ?? null);

  useEffect(() => { setSelectedDate(externalDate ?? null); }, [externalDate]);
  useEffect(() => { setSelectedTime(externalTime ?? null); }, [externalTime]);

  /* Normalize availability for BookingCalendar */
  const normalizedSlots = Array.isArray(availability)
    ? availability[0]?.time
      ? availability.filter((s) => s.available !== false).map((s) => s.time)
      : availability
    : defaultAvailability;

  return (
    <BookingCalendar
      date={selectedDate}
      time={selectedTime}
      availability={normalizedSlots}
      profileInfo={profileInfo}
      handleTimeSlotSelect={handleTimeSlotSelect}
      onGoBack={onGoBack}
      CustomForm={CustomForm}
      handleFormSubmit={handleFormSubmit}
      initialValues={initialValues}
      
      // Pass through all customization props (only if provided)
      {...(theme && { theme })}
      {...(customClasses && { customClasses })}
      {...(layout && { layout })}
      {...(animations && { animations })}
      {...(calendarProps && { calendarProps })}
      {...(timeSlotProps && { timeSlotProps })}
      {...(profileProps && { profileProps })}
      {...(formProps && { formProps })}
      {...(onDateChange && { onDateChange })}
      {...(onTimeChange && { onTimeChange })}
      {...(minDate && { minDate })}
      {...(maxDate && { maxDate })}
      {...(disabledDates && { disabledDates })}
      {...(highlightedDates && { highlightedDates })}
      {...(validationRules && { validationRules })}
    />
  );
};

/* ───────────────────────────────────────────────────────────── */
/* USAGE EXAMPLES                                                */
/* ───────────────────────────────────────────────────────────── */

// Example 1: Basic usage (works exactly like before)
export const BasicExample = () => (
  <AvailabilityView />
);

// Example 2: With custom theme
export const ThemedExample = () => (
  <AvailabilityView
    customClasses={{
      wrapper: "cal-bg-gradient-to-br cal-from-blue-50 cal-to-purple-50",
      container: "cal-shadow-xl cal-border-blue-200"
    }}
  />
);

// Example 3: With date restrictions
export const RestrictedDatesExample = () => (
  <AvailabilityView
    minDate={new Date()}
    maxDate={(() => {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      return d;
    })()}
    disabledDates={[
      new Date(2025, 0, 25),
      new Date(2025, 0, 26)
    ]}
  />
);

// Example 4: With custom validation
export const ValidationExample = () => (
  <AvailabilityView
    validationRules={{
      email: (value) => {
        if (!value) return "Email is required";
        if (!value.includes('@')) return "Please enter a valid email";
        return null;
      }
    }}
    formProps={{
      customFields: [{
        name: 'phone',
        label: 'Phone',
        placeholder: 'Your phone number',
        required: true
      }]
    }}
  />
);

// Example 5: Full customization
export const FullyCustomizedExample = () => (
  <AvailabilityView
    layout={{
      profileCols: 4,
      calendarCols: 5,
      timeSlotsCols: 3
    }}
    customClasses={{
      wrapper: "cal-bg-gray-50",
      profileSection: {
        copyButton: "cal-bg-blue-600 hover:cal-bg-blue-700 cal-text-white"
      }
    }}
    calendarProps={{
      weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }}
    timeSlotProps={{
      groupTimeSlots: true
    }}
    handleFormSubmit={(data) => {
      console.log('Booking submitted:', data);
      alert('Booking confirmed!');
    }}
  />
);

export default AvailabilityView;