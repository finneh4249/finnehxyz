/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neo-bg': '#FAFAFA',
        'neo-dark': '#0A0A0A',
        'neo-yellow': '#FFE600',
        'neo-pink': '#FF006E',
        'neo-blue': '#00B4D8',
        'neo-green': '#06FFA5',
        'neo-purple': '#B75CFF',
        'neo-orange': '#FF6B35',
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px #000',
        'brutal-lg': '10px 10px 0px 0px #000',
        'brutal-xl': '15px 15px 0px 0px #000',
        'brutal-sm': '4px 4px 0px 0px #000',
      },
      borderWidth: {
        'brutal': '4px',
        'brutal-thick': '6px',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#FF006E",
          "secondary": "#00B4D8", 
          "accent": "#FFE600",
          "neutral": "#0A0A0A",
          "base-100": "#FAFAFA",
          "base-200": "#F0F0F0",
          "base-300": "#E0E0E0",
          "info": "#00B4D8",
          "success": "#06FFA5",
          "warning": "#FFE600",
          "error": "#FF006E",
        },
      },
      {
        dark: {
          "primary": "#FF006E",
          "secondary": "#00B4D8",
          "accent": "#FFE600",
          "neutral": "#FAFAFA",
          "base-100": "#0A0A0A",
          "base-200": "#1A1A1A",
          "base-300": "#2A2A2A",
          "info": "#00B4D8",
          "success": "#06FFA5",
          "warning": "#FFE600",
          "error": "#FF006E",
        },
      },
    ],
  },
}