import React from 'react';
import { Clock, Copy } from 'lucide-react';

const ProfileSection = ({
    image,
    name,
    service,
    subtitle,
    shortText
}) => (
    <div className="bg-white/10 backdrop-blur-xl p-6 text-gray-800 flex flex-col h-full border-r border-white/20">
        {/* Logo */}
        <div className="mb-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-black rounded-sm"></div>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-1">{service}</h2>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Clock size={16} />
            <span>30mins</span>
        </div>

        {/* Title */}
        <div className="mb-6">
            <h1 className="text-2xl font-bold leading-tight mb-2 text-gray-800">
            {`Schedule a Meeting with ${name}`}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
            {shortText}
            </p>
        </div>

        {/* Copy Link Button */}
        <div className="mt-auto pb-2">
            <button className="flex items-center my-10 justify-center gap-1 w-40 py-2 bg-white/40 backdrop-blur-sm rounded-lg text-gray-800 hover:text-gray-900 hover:bg-white/60 transition-all font-medium text-sm shadow-lg border border-white/30">
                <Copy size={14} />
                Copy Link
            </button>
        </div>
    </div>
);

export default ProfileSection;