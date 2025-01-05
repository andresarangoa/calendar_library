import React from 'react';
import './DailyAppointments.scss'; // Correct SCSS import

const ProfileHeader = ({ image, name, subtitle, shortText }) => {
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
                <h3 className="profile--header__name">{name}</h3>
                <p className="profile--header__subtitle">{subtitle}</p>
                <p className="profile--header__shorttext">{shortText}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
