/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FAFAFA',       // tokens.base.light
          dark: '#0A0A0A',     // tokens.base.dark
          white: '#FFFFFF',    // tokens.base.pure-white
          black: '#000000',    // tokens.base.pure-black
          yellow: '#FFE600',   // tokens.palette.neo-yellow
          pink: '#FF006E',     // tokens.palette.neo-pink
          blue: '#00B4D8',     // tokens.palette.neo-blue
          green: '#06FFA5',    // tokens.palette.neo-green
          purple: '#B75CFF',   // tokens.palette.neo-purple
          orange: '#FF6B35',   // tokens.palette.neo-orange
        }
      },
      boxShadow: {
        'brutal-sm': '4px 4px 0px 0px #000000',
        'brutal-md': '6px 6px 0px 0px #000000',
        'brutal-lg': '10px 10px 0px 0px #000000',
        'brutal-xl': '15px 15px 0px 0px #000000',
        // Dark mode alternatives (white outlines/shadows)
        'brutal-dark-sm': '4px 4px 0px 0px #FFFFFF', 
        'brutal-dark-md': '6px 6px 0px 0px #FFFFFF',
        // Legacy support (mapping to new system if needed, or keeping for backward compat)
        'brutal': '6px 6px 0px 0px #000',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
        // Legacy support
        'brutal': '4px',
        'brutal-thick': '6px',
      },
      borderRadius: {
        DEFAULT: '0px',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
    },
  },
  plugins: [],
}