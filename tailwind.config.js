/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // High-stakes industrial palette
        "signal-orange": "oklch(75% 0.22 45)", /* High-visibility orange */
        "signal-orange-dim": "oklch(40% 0.15 45)",
        "signal-black": "oklch(14% 0.01 258)", /* Greased metal */
        "signal-charcoal": "oklch(18% 0.01 258)",
        "signal-white": "oklch(96% 0.005 258)", /* Clean paper */
        "signal-cyan": "oklch(80% 0.15 190)", /* Diagnostic cyan */
        "signal-cyan-dim": "oklch(25% 0.08 190)",
        "signal-amber": "oklch(85% 0.2 85)", /* Warning amber */
        "signal-amber-dim": "oklch(30% 0.1 85)",
        "signal-red": "oklch(65% 0.25 25)", /* Alert red */
      },
      fontSize: {
        "signal-xs": ["clamp(0.64rem, 0.61rem + 0.15vw, 0.72rem)", "1.4"],
        "signal-sm": ["clamp(0.8rem, 0.75rem + 0.25vw, 0.94rem)", "1.4"],
        "signal-base": ["clamp(1rem, 0.92rem + 0.4vw, 1.25rem)", "1.5"],
        "signal-lg": ["clamp(1.15rem, 1.05rem + 0.5vw, 1.4rem)", "1.3"],
        "signal-xl": ["clamp(1.4rem, 1.2rem + 1vw, 1.8rem)", "1.2"],
        "signal-2xl": ["clamp(1.75rem, 1.5rem + 1.5vw, 2.5rem)", "1"],
        "signal-3xl": ["clamp(2.2rem, 1.8rem + 2.5vw, 3.2rem)", "0.95"],
        "signal-4xl": ["clamp(2.8rem, 2.2rem + 3.5vw, 4.2rem)", "0.9"],
        "signal-hero": ["clamp(3.8rem, 1rem + 12vw, 13rem)", "0.8"],
      },
      boxShadow: {
        "signal-sm": "2px 2px 0px 0px #000000",
        "signal-md": "4px 4px 0px 0px #000000",
        "signal-lg": "8px 8px 0px 0px #000000",
        "signal-orange": "4px 4px 0px 0px oklch(75% 0.22 45)",
        "signal-cyan": "4px 4px 0px 0px oklch(80% 0.15 190)",
        "signal-amber": "4px 4px 0px 0px oklch(85% 0.2 85)",
      },
      borderRadius: {
        DEFAULT: "0px",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "Noto Sans JP", "sans-serif"],
        body: ["'B612'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
