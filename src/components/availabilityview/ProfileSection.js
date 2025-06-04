import React from 'react';
import { Clock, Copy } from 'lucide-react';

const ProfileSection = ({
    image,
    name,
    service,
    subtitle,
    shortText
}) => (
    <div className="cal-bg-white/10 cal-backdrop-blur-xl cal-p-6 cal-text-gray-800 cal-flex cal-flex-col cal-h-full cal-border-r cal-border-white/20">
        {/* Logo */}
        <div className="cal-mb-6">
            <div className="cal-w-16 cal-h-16 cal-rounded-full cal-flex cal-items-center cal-justify-center cal-mb-4">
                <div className="cal-w-8 cal-h-8 cal-bg-white cal-rounded-full cal-flex cal-items-center cal-justify-center">
                    <img
                        src={image}
                        alt={name}
                        className="cal-w-16 cal-h-16 cal-rounded-full cal-object-cover cal-mb-4 cal-border-2 cal-border-black"
                    />
                </div>
            </div>
            <h2 className="cal-text-xl cal-font-bold cal-mb-1">{service}</h2>
        </div>

        {/* Duration */}
        <div className="cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600 cal-mb-4">
            <Clock size={16} />
            <span>30mins</span>
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

        {/* Copy Link Button */}
        <div className="cal-mt-auto cal-pb-2">
            <button className="cal-flex cal-items-center cal-my-10 cal-justify-center cal-gap-1 cal-w-40 cal-py-2 cal-bg-white/40 cal-backdrop-blur-sm cal-rounded-lg cal-text-gray-800 hover:cal-text-gray-900 hover:cal-bg-white/60 cal-transition-all cal-font-medium cal-text-sm cal-shadow-lg cal-border cal-border-white/30">
                <Copy size={14} />
                Copy Link
            </button>
        </div>
    </div>
);

export default ProfileSection;