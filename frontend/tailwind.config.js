/** @type {import('tailwindcss').Config} */
export default {
  content:
      [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/*.{js,ts,jsx,tsx}',
      ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        accentBlue: '#4f8cff',
        accentGreen: '#4bd1a0',
        accentOrange: '#ffcf8f',
        pastelBg: '#f9fafc',
        pastelDark: '#1a1f2a',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
