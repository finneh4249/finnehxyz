import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0a0a0f",
          surface: "#12121a",
          "surface-light": "#1a1a2e",
          border: "#2a2a3a",
          "border-light": "#3a3a4a",
          text: "#e0e0e8",
          "text-muted": "#8888a0",
          // Neon accents
          cyan: "#00fff5",
          magenta: "#ff00ff",
          yellow: "#f0ff00",
          green: "#39ff14",
          orange: "#ff6600",
          pink: "#ff2d7b",
          blue: "#00b4d8",
          purple: "#b75cff",
        },
        // Keep neo- aliases for backward compat during migration
        neo: {
          bg: "#0a0a0f",
          dark: "#0a0a0f",
          white: "#e0e0e8",
          black: "#0a0a0f",
          yellow: "#f0ff00",
          pink: "#ff2d7b",
          blue: "#00b4d8",
          green: "#39ff14",
          purple: "#b75cff",
          orange: "#ff6600",
        },
      },
      boxShadow: {
        "brutal-sm": "3px 3px 0px 0px #2a2a3a",
        "brutal-md": "5px 5px 0px 0px #2a2a3a",
        "brutal-lg": "8px 8px 0px 0px #2a2a3a",
        "brutal-xl": "12px 12px 0px 0px #2a2a3a",
        brutal: "5px 5px 0px 0px #2a2a3a",
        // Neon glow shadows
        "glow-cyan": "0 0 15px rgba(0, 255, 245, 0.4), 0 0 30px rgba(0, 255, 245, 0.1)",
        "glow-magenta": "0 0 15px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.1)",
        "glow-green": "0 0 15px rgba(57, 255, 20, 0.4), 0 0 30px rgba(57, 255, 20, 0.1)",
        "glow-yellow": "0 0 15px rgba(240, 255, 0, 0.4), 0 0 30px rgba(240, 255, 0, 0.1)",
        "glow-cyan-lg": "0 0 25px rgba(0, 255, 245, 0.5), 0 0 50px rgba(0, 255, 245, 0.15)",
        "glow-magenta-lg": "0 0 25px rgba(255, 0, 255, 0.5), 0 0 50px rgba(255, 0, 255, 0.15)",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        6: "6px",
        brutal: "3px",
        "brutal-thick": "4px",
      },
      borderRadius: {
        DEFAULT: "0px",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
      },
      transitionTimingFunction: {
        brutal: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "flicker": "flicker 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: 1 },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: 0.33 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "blink": {
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
  },
};
