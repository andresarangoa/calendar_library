// tailwind.config.js
module.exports = {
    corePlugins: {
      preflight: false,   // ⬅ disables the entire reset
    },
    content: ["./src/**/*.{js,jsx,ts,tsx,scss}"],
    theme: { extend: {} },
  };
  