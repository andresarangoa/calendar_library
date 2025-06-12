// tailwind.config.js
module.exports = {
    prefix: 'cal-', // ⬅ Prefix all classes
    corePlugins: {
      preflight: false,
    },
    safelist: [
      { pattern: /^cal-col-span-(1[0-2]|[1-9])$/ }   //  cal-col-span-1 … cal-col-span-12
    ],
    content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
    theme: { extend: {} },
  };