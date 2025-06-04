// tailwind.config.js
module.exports = {
    prefix: 'cal-', // ⬅ Prefix all classes
    corePlugins: {
      preflight: false,
    },
    content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
    theme: { extend: {} },
  };