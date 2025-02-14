// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#0f0524',
          900: '#1a0a2b',
          800: '#2d0f4d',
          500: '#6b21a8',
          300: '#c084fc',
        }
      }
    },
  },
  plugins: [],
};

export default config;