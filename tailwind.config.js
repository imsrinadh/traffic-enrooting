/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary orange accent
        accent: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // primary action color
          600: '#ea6c0a',
          700: '#c2570a',
          800: '#9a3d08',
          900: '#7c2d12',
        },
        // Neutral surface palette
        surface: {
          page:    '#F5F6F8', // off-white page background
          base:    '#FFFFFF', // content surfaces
          subtle:  '#F0F2F5', // secondary surfaces
          border:  '#E4E7EB', // default borders
          hover:   '#EEF0F3', // hover state
        },
        // Text hierarchy
        text: {
          primary:   '#111827',
          secondary: '#4B5563',
          tertiary:  '#9CA3AF',
          disabled:  '#D1D5DB',
          inverse:   '#FFFFFF',
        },
        // Semantic risk colors
        risk: {
          low: {
            bg:     '#F0FDF4',
            border: '#86EFAC',
            text:   '#15803D',
            icon:   '#16A34A',
          },
          medium: {
            bg:     '#FFFBEB',
            border: '#FCD34D',
            text:   '#92400E',
            icon:   '#D97706',
          },
          high: {
            bg:     '#FFF1F2',
            border: '#FCA5A5',
            text:   '#991B1B',
            icon:   '#DC2626',
          },
          severe: {
            bg:     '#FFF1F2',
            border: '#EF4444',
            text:   '#7F1D1D',
            icon:   '#B91C1C',
          },
        },
        // Service status colors
        status: {
          connected:   '#16A34A',
          unavailable: '#9CA3AF',
          waiting:     '#D97706',
          error:       '#DC2626',
        },
      },
      boxShadow: {
        card:    '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04)',
        focus:   '0 0 0 3px rgba(249,115,22,0.25)',
      },
      borderRadius: {
        DEFAULT: '4px',
        md:      '6px',
        lg:      '8px',
        xl:      '12px',
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
};
