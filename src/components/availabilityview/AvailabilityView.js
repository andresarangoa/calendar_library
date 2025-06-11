// AvailabilityView.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "../styles/CalendarGrid.scss";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./Form/BookingForm";
dayjs.extend(isoWeek);

/* — fallback data — */
const fallbackAvailability = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: false },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: true },
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

/* ———————————————————————————————— */
/* Main component                                                   */
/* ———————————————————————————————— */
const AvailabilityView = ({
  date:           externalDate,
  time:           externalTime,
  availability    = fallbackAvailability,
  profileInfo     = fallbackProfile,
  onGoBack,
  handleTimeSlotSelect = (t) => alert(`You picked: ${t}`),
  CustomForm      = BookingForm,
  handleFormSubmit,
  initialValues   = {
    name: "",
    phone: "",
    email: "",
    date: externalDate,
    time: externalTime,
  },
}) => {
  /* Local state stays in sync with incoming props */
  const [selectedDate, setSelectedDate] = useState(externalDate ?? null);
  const [selectedTime, setSelectedTime] = useState(externalTime ?? null);

  useEffect(() => { setSelectedDate(externalDate ?? null); }, [externalDate]);
  useEffect(() => { setSelectedTime(externalTime ?? null); }, [externalTime]);

  /* Availability in *string* format for BookingCalendar */
  const normalisedSlots = availability[0]?.time
    ? availability                   // array of objects
        .filter((s) => s.available)  // keep only free
        .map((s) => s.time)
    : availability;                  // already array of strings

  return (
    <BookingCalendar
      date={selectedDate}
      time={selectedTime}
      availability={normalisedSlots}
      profileInfo={profileInfo}
      handleTimeSlotSelect={handleTimeSlotSelect}
      onGoBack={onGoBack}
      CustomForm={CustomForm}
      handleFormSubmit={handleFormSubmit}
      initialValues={initialValues}
    />
  );
};

export default AvailabilityView;