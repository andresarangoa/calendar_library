import React from 'react';
import { Clock, Copy, Calendar } from 'lucide-react';

const ProfileSectionMeeting = ({
    image,
    name,
    service,
    subtitle,
    meetingLink,
    meetingLongTime,
    shortText,
    selectedDate,
}) => (
    <div className="cal-bg-white/10 cal-backdrop-blur-xl cal-p-6 cal-text-gray-800 cal-flex cal-flex-col 
    cal-h-full cal-border-r-2 cal-border-l-0 cal-border-t-0 cal-border-b-0 cal-border-white/80 cal-border-solid">
        {/* Logo */}
        <div className="cal-mb-6">
            <div className="cal-w-16 cal-h-16 cal-rounded-full cal-flex cal-items-center cal-justify-center cal-mb-4 ">
                <div className="cal-w-8 cal-h-8 cal-bg-white cal-rounded-full cal-flex cal-items-center cal-justify-center ">
                    <img
                        src={image}
                        alt={name}
                        className="cal-w-16 cal-h-16 cal-rounded-full cal-object-cover cal-mb-4 cal-border-2 cal-border-black cal-border-solid"
                    />
                </div>
            </div>
            <h2 className="cal-text-xl cal-font-bold cal-mb-1">{service}</h2>
        </div>

        {/* Duration */}
        <div className="cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600 cal-mb-4">

        </div>

        {/* Title */}
        <div className="cal-mb-6">
            <h1 className="cal-text-2xl cal-font-bold cal-leading-tight cal-mb-2 cal-text-gray-800">
                {`Schedule a Meeting with ${name}`}
            </h1>
            <p className="cal-text-gray-600 cal-text-sm cal-leading-relaxed">
                {shortText}
            </p>
        </div>

        {/* Gray spacer */}
        <div className="cal-h-px cal-bg-[#152226]/20 cal-my-6 cal-mx-1"></div>

        {/* Components in column format */}
        <div className="cal-flex cal-flex-col cal-gap-4">
            <div className="cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600 cal-font-bold">
                <Clock size={16} strokeWidth={2.5} />
                <span>{meetingLongTime}</span>
            </div>

            <div className="cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600 cal-font-bold">
                <Calendar size={16} strokeWidth={2.5} />
                <span>{selectedDate}</span>
            </div>
        </div>

        {/* Copy Link Button */}
        <div className="cal-mt-auto cal-pb-2">
            <button
                onClick={() => navigator.clipboard.writeText(meetingLink)}
                className="cal-flex cal-items-center cal-my-10 cal-justify-center cal-gap-1 cal-w-30 cal-py-2 cal-bg-white/40 cal-backdrop-blur-sm cal-rounded-xl cal-text-gray-800 hover:cal-text-gray-900 hover:cal-bg-white/60 cal-transition-all cal-font-medium cal-text-sm cal-shadow-lg cal-border cal-border-white/30">
                <Copy size={14} />
                Copy Link
            </button>
        </div>
    </div>
);

export default ProfileSectionMeeting;