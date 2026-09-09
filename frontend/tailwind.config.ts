import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#f2fcf5',
          100: '#e1f8ea',
          200: '#c4f0d6',
          300: '#95e3b8',
          400: '#5ecc93',
          500: '#34b274',
          600: '#25915d',
          700: '#20734c',
          800: '#1d5c3f',
          900: '#1a4c35',
          950: '#0a2a1c',
        },
        saffron: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#fedd88',
          300: '#fdc447',
          400: '#fba518',
          500: '#f5870b',
          600: '#d96406',
          700: '#b44409',
          800: '#92350e',
          900: '#782d0f',
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
