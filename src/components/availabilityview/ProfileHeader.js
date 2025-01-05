import React from 'react';
import './DailyAppointments.scss'; // Correct SCSS import
import { FaClock, FaVideo } from "react-icons/fa";
const ProfileHeader = ({ image,
    name,
    subtitle,
    service,
    shortText,
    subtitleIcon = <FaClock />, // Default clock icon
    shortTextIcon = <FaVideo />, // Default video icon
}) => {
    return (
        <div className="profile--header">
            {/* Image Box */}
            <div className="profile--header__image-box">
                {/* Image */}
                {image ? (
                    <img
                        src={image}
                        alt={`${name}'s profile`}
                        className="profile--header__image"
                    />
                ) : (
                    <div className="profile--header__image-placeholder">
                        No Image
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="profile--header__details">
                <h3 className="profile--header__name">
                    {name}
                    <span className="profile--header__service">{service}</span>
                </h3>
                <p className="profile--header__subtitle">
                    {subtitleIcon} {/* Display the subtitle icon */}
                    {subtitle}
                </p>
                <p className="profile--header__shorttext">
                    {shortTextIcon} {/* Display the short text icon */}
                    {shortText}
                </p>
            </div>
        </div>
    );
};

export default ProfileHeader;
