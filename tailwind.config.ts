import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#0f172a',
          surface: '#1e293b',
          gold:    '#c8a97e',
          teal:    '#0f766e',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:     ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:     ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        'slide-up': 'slideUp 0.25s ease-out both',
        'fade-in':  'fadeIn 0.5s ease-out both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
};

export default config;
