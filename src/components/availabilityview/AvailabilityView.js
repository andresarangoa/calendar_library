import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import '../styles/CalendarGrid.scss';
import MonthlyCalendar from '../eventcalendar/montlyCalendar/MonthlyCalendar';
import { EventCalendar } from '../';
import DailyAppointments from './DailyAppointments';
import ProfileHeader from './ProfileHeader';
import { Form, Input, Button } from 'antd';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Extend dayjs with ISO week support
dayjs.extend(isoWeek);

const generateWeekDays = (startOfWeek) => {
    const days = [];
    let day = startOfWeek.clone();
    days.push(day);
    day = day.add(1, 'day');
    return days;
};

const customStyles = {
    bgActualDay: '#1376f4',
};

const availabilityList = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
];

const visibilityOptions = {
    todayButton: true,
    dropdownFilter: false,
    addEventButton: false,
    header: false,
    daysNames: true,
    filters: {
        yearly: false,
        daily: false,
    },
};

const defaultProfileInfo = {
    image: "https://avatars.githubusercontent.com/u/146370544?v=4",
    name: "John Doe",
    service: "EVO Introduction Call",
    subtitle: "Fitness Coach",
    shortText: "Helping you reach your fitness goals.",
};

const AvailabilityView = ({ date: externalDate,
    time: externalTime, availability = availabilityList,
    profileInfo = defaultProfileInfo,
    onDailyEvent, handleTimeSlotSelect = (timeSlot) => { alert(`You selected: ${timeSlot.time}`); } },
    onGoBack = undefined,) => {

    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
    const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('isoWeek'));
    const daysOfWeek = generateWeekDays(currentWeek);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // Sync internal state with external props
    useEffect(() => {
        if (externalDate !== undefined) setSelectedDate(externalDate);
        if (externalTime !== undefined) setSelectedTime(externalTime);
    }, [externalDate, externalTime]);

    // Default go back action
    const defaultGoBack = () => {
        setSelectedTime('');
        setSelectedDate('');
    };

    // Determine which go back function to use
    const handleGoBack = typeof onGoBack === 'function' ? onGoBack : defaultGoBack;


    const handlePrevWeek = () => setCurrentWeek(currentWeek.subtract(1, 'week'));
    const handleNextWeek = () => setCurrentWeek(currentWeek.add(1, 'week'));
    const handleToday = () => setCurrentWeek(dayjs().startOf('isoWeek'));

    const isParamsPassed = selectedTime && selectedDate;
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Form submitted successfully!');
    };
    return (
        <div>
            <div className={`calendar--public ${isParamsPassed ? 'calendar--public--two-columns' : ''}`}>
                {/* First Column */}
                <div className="calendar--public--first-column">
                    <ProfileHeader
                        image={profileInfo.image}
                        name={profileInfo.name}
                        service={profileInfo.service}
                        subtitle={profileInfo.subtitle}
                        shortText={profileInfo.shortText}
                    />
                </div>

                {/* Second Column */}
                {!isParamsPassed && (
                    <div className="calendar--public--second-column">
                        <h3 className="calendar--public--second-column__title">Select a Date & Time</h3>
                        <EventCalendar
                            eventsData={[]}
                            addEvent={() => alert('ring')}
                            title=""
                            styles={{
                                bgActualDay: '#1376f4',
                            }}
                            onSelectedEvent={onDailyEvent}
                            visibilityOptions={{
                                todayButton: true,
                                dropdownFilter: false,
                                addEventButton: false,
                                header: false,
                                daysNames: true,
                                filters: { yearly: false, daily: false },
                            }}
                        />
                    </div>
                )}

                {/* Third Column */}
                {!isParamsPassed && (
                    <div className="calendar--public--third-column">
                        <div className="calendar--public--third-column__daily">
                            <DailyAppointments
                                availability={availability}
                                onTimeSlotSelect={handleTimeSlotSelect}
                            />
                        </div>
                    </div>
                )}
                {/* Fourth Column */}
                {isParamsPassed && (
                    <div className="calendar--public--two-columns--fourth-column">
                        <Button
                            type="link"
                            onClick={handleGoBack}
                            className="calendar--public--two-columns--fourth-column__button"
                        >
                            <ArrowLeftIcon style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                            Back
                        </Button>
                        <h3>Details for Selected Time and Date</h3>

                        <Form
                            name="contactForm"
                            layout="vertical"
                            onFinish={handleFormSubmit}
                            initialValues={{
                                name: '',
                                phone: '',
                                email: '',
                                date: selectedDate,
                                time: selectedTime,
                            }}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    { required: true, message: 'Please input your name!' },
                                ]}
                            >
                                <Input placeholder="Enter your name" />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    { required: true, message: 'Please input your phone number!' },
                                    {
                                        pattern: /^[0-9]{10,}$/,
                                        message: 'Please enter a valid phone number!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item label="Date" name="date">
                                <Input disabled />
                            </Form.Item>

                            <Form.Item label="Time" name="time">
                                <Input disabled />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailabilityView;
