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
          50: '#EEF5FD',
          100: '#D9E8FA',
          200: '#B3D1F5',
          300: '#80B2EC',
          400: '#4A90DE',
          500: '#1F74CC',
          600: '#0A66C2', // Professional blue primary
          700: '#0A559F',
          800: '#0B3F78',
          900: '#0A2A52',
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
          50: '#F8FAFC',
          100: '#F3F5F8',
          200: '#E8ECF1',
        },
        ink: {
          800: '#0F2742',
          900: '#0A1B30',
          950: '#06111F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Gujarati', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.625rem',
        '2xl': '0.75rem',
        '3xl': '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 39, 66, 0.06)',
        md: '0 2px 8px rgba(15, 39, 66, 0.08)',
        lg: '0 8px 24px rgba(15, 39, 66, 0.10)',
        xl: '0 12px 32px rgba(15, 39, 66, 0.12)',
        '2xl': '0 20px 48px rgba(15, 39, 66, 0.16)',
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

