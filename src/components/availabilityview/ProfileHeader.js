import React from 'react';
import './DailyAppointments.scss';  // Make sure to style this component

const ProfileHeader = ({ image, name, subtitle, shortText }) => {
    return (
        <div className="profile-header">
            <img src={image} alt={`${name}'s profile`} className="profile-image" />
            <div className="profile-details">
                <h3 className="profile-name">{name}</h3>
                <p className="profile-subtitle">{subtitle}</p>
                <p className="profile-short-text">{shortText}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
