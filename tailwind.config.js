/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        solar: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#BAD2FF',
          300: '#85B1FF',
          400: '#4888FF',
          500: '#1D62F0',
          600: '#1E3A8A', // Deep solar blue primary
          700: '#152C70',
          800: '#0F2053',
          900: '#0A153A',
        },
        sun: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Sun amber accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        leaf: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981', // Clean energy green
          600: '#059669',
          700: '#047857',
        },
        terracotta: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F5',
          200: '#F3EFEA',
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans Gujarati', 'Noto Sans Devanagari', 'Inter', 'system-ui', 'sans-serif'],
      },
      minHeight: {
        'touch': '48px',
      },
      minWidth: {
        'touch': '48px',
      }
    },
  },
  plugins: [],
}

