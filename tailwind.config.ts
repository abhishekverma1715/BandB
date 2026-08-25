import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#174A8B',          // Primary Brand Blue
        'primary-hover': '#2563B5',    // Secondary Blue for hovers & highlights
        secondary: '#101828',        // Primary Text / Dark Neutral
        dark: '#0B1B33',             // Deep Navy for dark sections/panels/footer
        brandRed: '#B8202A',         // Brand Red (sparingly for logo/accents)
        success: '#16A36A',          // Success Green ONLY for stock/verified/savings
        background: '#F7F8FA',       // Neutral Background
        body: '#667085',             // Secondary Text
        border: '#E4E7EC',           // Border Color
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
