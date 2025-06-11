// utils.js - Comprehensive defaults and utilities for the booking calendar system

import dayjs from "dayjs";

/* ═══════════════════════════════════════════════════════════════════
   DEFAULT CONSTANTS - All styling and configuration defaults
   ═══════════════════════════════════════════════════════════════════ */

// Default availability slots
export const defaultAvailability = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
];

// Default profile information
export const defaultProfile = {
  image: "https://avatars.githubusercontent.com/u/146370544?v=4",
  name: "John Doe",
  service: "Consultation",
  subtitle: "Professional Consultant",
  meetingLink: "https://example.com/meeting",
  meetingLongTime: "30 minutes",
  shortText: "Let's discuss how I can help you achieve your goals."
};

// Calendar component defaults
export const calendarDefaults = {
  monthNames: ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"],
  weekDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  disablePastDays: true,
  styles: {
    container: "cal-h-full cal-bg-white/5 cal-backdrop-blur-xl cal-p-8",
    header: "cal-flex cal-items-center cal-justify-between cal-mb-8",
    monthTitle: "cal-text-xl cal-font-medium cal-text-gray-900",
    navigationButtons: "cal-flex cal-items-center cal-gap-1",
    navButton: "cal-p-2 cal-bg-transparent hover:cal-shadow-lg cal-rounded-lg cal-transition-all",
    navIcon: "cal-text-gray-600",
    grid: "cal-grid cal-grid-cols-7 cal-gap-2",
    weekDayHeader: "cal-text-center cal-text-sm cal-text-gray-900 cal-py-3 cal-font-semibold",
    dayCell: "cal-aspect-square cal-flex cal-items-center cal-justify-center",
    dayButton: {
      base: "cal-w-10 cal-h-10 cal-flex cal-items-center cal-justify-center cal-text-sm cal-font-bold cal-rounded-full cal-transition-all cal-relative",
      disabled: "cal-bg-transparent cal-text-gray-500 cal-cursor-not-allowed",
      selected: "cal-bg-gray-900 cal-text-white",
      default: "cal-bg-transparent cal-text-gray-700 hover:cal-border hover:cal-border-gray-300 cal-cursor-pointer"
    },
    todayMarker: "cal-absolute cal-bottom-1 cal-w-1 cal-h-1 cal-bg-gray-500 cal-rounded-full"
  }
};

// Time slot section defaults
export const timeSlotDefaults = {
  styles: {
    container: "cal-h-full cal-bg-white/5 cal-backdrop-blur-xl cal-p-6 cal-flex cal-flex-col cal-border-r-0 cal-border-l-1 cal-border-t-0 cal-border-b-0 cal-border-white/80 cal-border-solid",
    header: "cal-text-lg cal-font-semibold cal-text-gray-800 cal-mb-4",
    scrollContainer: "cal-max-h-[530px] cal-overflow-y-auto cal--mr-6 cal-pr-6",
    slotList: "cal-space-y-2 cal-pr-2",
    slotButton: {
      base: "cal-w-full cal-p-3 cal-mx-2 cal-text-sm cal-font-semibold cal-rounded-lg cal-border cal-transition-all cal-backdrop-blur-sm",
      selected: "cal-bg-purple-600 cal-text-white cal-border-purple-600",
      default: "cal-bg-white/40 cal-text-gray-700 cal-border-white/30 hover:cal-border-white/50 hover:cal-bg-white/60"
    }
  },
  formatDate: (date) => {
    if (!date) return '';
    const options = { weekday: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};

// Profile section defaults
export const profileDefaults = {
  styles: {
    container: "cal-bg-white/10 cal-backdrop-blur-xl cal-p-6 cal-text-gray-800 cal-flex cal-flex-col cal-h-full cal-border-r- cal-border-l-0 cal-border-t-0 cal-border-b-0 cal-border-white cal-border-solid",
    logoWrapper: "cal-mb-6",
    logoContainer: "cal-w-16 cal-h-16 cal-rounded-full cal-flex cal-items-center cal-justify-center cal-mb-4",
    logoInner: "cal-w-8 cal-h-8 cal-bg-white cal-rounded-full cal-flex cal-items-center cal-justify-center",
    image: "cal-w-16 cal-h-16 cal-rounded-full cal-object-cover cal-mb-4 cal-border-2 cal-border-black cal-border-solid",
    serviceTitle: "cal-text-xl cal-font-bold cal-mb-1",
    duration: "cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600 cal-mb-4 cal-font-semibold",
    titleSection: "cal-mb-6",
    mainTitle: "cal-text-2xl cal-font-bold cal-leading-tight cal-mb-2 cal-text-gray-800",
    description: "cal-text-gray-600 cal-text-sm cal-leading-relaxed",
    copyButtonWrapper: "cal-mt-auto cal-pb-2",
    copyButton: "cal-flex cal-items-center cal-my-10 cal-justify-center cal-gap-1 cal-w-30 cal-py-2 cal-bg-white/40 cal-backdrop-blur-sm cal-rounded-xl cal-text-gray-800 hover:cal-text-gray-900 hover:cal-bg-white/60 cal-transition-all cal-font-semibold cal-text-sm cal-shadow-lg cal-border cal-border-white/30"
  },
  icons: {
    size: 16,
    strokeWidth: 2.5
  }
};

// Profile section meeting defaults (extends profile defaults)
export const profileMeetingDefaults = {
  styles: {
    ...profileDefaults.styles,
    container: "cal-bg-white/10 cal-backdrop-blur-xl cal-p-6 cal-text-gray-800 cal-flex cal-flex-col cal-h-full cal-border-r-2 cal-border-l-0 cal-border-t-0 cal-border-b-0 cal-border-white/80 cal-border-solid",
    divider: "cal-h-px cal-bg-[#152226]/20 cal-my-6 cal-mx-1",
    infoSection: "cal-flex cal-flex-col cal-gap-4",
    infoItem: "cal-flex cal-items-center cal-gap-2 cal-text-sm cal-text-gray-600 cal-font-bold"
  }
};

// Booking form defaults
export const bookingFormDefaults = {
  styles: {
    container: "cal-grid cal-min-h-[610px] cal-grid-cols-1 lg:cal-grid-cols-3 cal-h-full",
    leftPanel: "cal-col-span-1 cal-h-full",
    rightPanel: "cal-py-12 lg:cal-p-12 cal-bg-white/5 cal-col-span-2",
    formWrapper: "cal-h-full cal-flex cal-flex-col cal-mx-24",
    formContent: "cal-flex-1 cal-space-y-6",
    fieldLabel: "cal-block cal-text-sm cal-font-semibold cal-text-gray-700 cal-mb-2",
    input: "cal-w-full cal-px-4 cal-py-3 cal-bg-white/80 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500",
    textarea: "cal-w-full cal-px-4 cal-py-3 cal-bg-white/80 cal-border cal-border-white/30 cal-rounded-xl focus:cal-outline-none focus:cal-ring-2 focus:cal-ring-purple-400 focus:cal-border-transparent cal-transition-all cal-placeholder-gray-500 cal-resize-none",
    actionsWrapper: "cal-flex cal-gap-4 cal-items-center",
    termsText: "cal-w-2/5 cal-text-sm cal-text-gray-600",
    termsLink: "cal-text-purple-600 hover:cal-text-purple-700",
    spacer: "cal-w-1/5",
    backButton: "cal-w-16 cal-px-2 cal-py-4 cal-bg-white/60 cal-border cal-border-white/30 cal-rounded-xl cal-text-gray-700 cal-font-medium cal-bg-white/80 hover:cal-bg-white/80 cal-transition-all cal-text-xs",
    confirmButton: "cal-flex-1 cal-py-4 cal-bg-gray-800 cal-text-white cal-rounded-xl cal-font-medium hover:cal-bg-gray-900 cal-transition-all cal-disabled:opacity-50 cal-disabled:cursor-not-allowed"
  },
  fields: {
    name: { placeholder: "Enter name", label: "Your Name", required: true },
    email: { placeholder: "Enter email", label: "Email address", required: true },
    description: { placeholder: "Enter description", label: "Description", rows: 4 }
  }
};

// Default theme configuration
export const defaultTheme = {
  // Main container styles
  background: "cal-bg-gradient-to-br cal-from-purple-50 cal-via-white cal-to-pink-50 cal-w-full cal-min-h-screen cal-p-8 cal-flex cal-items-center cal-justify-center",
  container: "cal-bg-white/80 cal-backdrop-blur-xl cal-mx-auto cal-shadow-2xl cal-border cal-border-white/50",
  minHeight: "cal-min-h-[700px]",
  gridLayout: "cal-grid cal-grid-cols-12 cal-h-full cal-gap-0",
  
  // Responsive breakpoints
  responsive: {
    mobile: "sm:cal-grid-cols-12",
    tablet: "md:cal-grid-cols-12",
    desktop: "lg:cal-grid-cols-12"
  },
  
  // Color scheme
  colors: {
    primary: "purple",
    secondary: "gray",
    accent: "pink",
    text: {
      primary: "gray-900",
      secondary: "gray-700",
      muted: "gray-600"
    },
    background: {
      primary: "white",
      secondary: "white/5",
      hover: "white/60"
    },
    border: {
      primary: "white/80",
      secondary: "white/30",
      hover: "white/50"
    }
  },
  
  // Animation defaults
  animations: {
    transition: "cal-transition-all",
    duration: "cal-duration-300",
    easing: "cal-ease-in-out"
  }
};

/* ═══════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════ */

// Convert various date formats to JavaScript Date
export const toJSDate = (dateLike) => {
  if (!dateLike) return null;
  if (dateLike instanceof Date) return dateLike;
  if (dayjs.isDayjs(dateLike)) return dateLike.toDate();
  if (typeof dateLike === "string" || typeof dateLike === "number") {
    return dayjs(dateLike).toDate();
  }
  return null;
};

// Deep merge theme objects
export const mergeTheme = (customTheme = {}) => {
  const merge = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = merge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };
  
  const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
  
  return merge(defaultTheme, customTheme);
};

// Merge custom classes with defaults
export const mergeClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Format date consistently across components
export const formatDate = (date, format = 'long') => {
  if (!date) return '';
  
  const formats = {
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    short: { weekday: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' }
  };
  
  return new Date(date).toLocaleDateString('en-US', formats[format] || formats.long);
};

// Generate unique IDs for accessibility
export const generateId = (prefix = 'booking') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Validate time format
export const isValidTimeFormat = (time) => {
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  return timeRegex.test(time);
};

// Sort time slots chronologically
export const sortTimeSlots = (slots) => {
  return slots.sort((a, b) => {
    const timeA = convertTo24Hour(a);
    const timeB = convertTo24Hour(b);
    return timeA - timeB;
  });
};

// Convert 12-hour time to 24-hour for sorting
const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  
  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
};