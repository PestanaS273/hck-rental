/** @type {import('tailwindcss').Config} */
// Tokens: see DESIGN.md. Only `adobe`, `ink`, `onyx`, `cobre` and `white` are part of the system.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        adobe: { DEFAULT: '#F6EEE9', deep: '#EFE3DC', line: '#E2D3CA' },
        ink: { DEFAULT: '#333333', soft: '#5C5550' },
        onyx: '#000000',
        cobre: { DEFAULT: '#B5452B', light: '#E8A48F' },
      },
      fontFamily: {
        sans: ['"Inter Tight"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        caption: ['10px', { lineHeight: '1.2' }],
        label: ['12px', { lineHeight: '1.3', letterSpacing: '0.04em' }],
        body: ['14px', { lineHeight: '1.5' }],
        'body-lg': ['16px', { lineHeight: '1.5' }],
        subheading: ['18px', { lineHeight: '1.3' }],
        'subhead-lg': ['22px', { lineHeight: '1.29' }],
        heading: ['clamp(26px, 3vw, 33px)', { lineHeight: '1.13' }],
        display: ['clamp(48px, 7vw, 80px)', { lineHeight: '0.91' }],
        'display-xl': ['clamp(52px, 8.4vw, 110px)', { lineHeight: '0.88' }],
      },
      maxWidth: { page: '1200px', prose: '62ch' },
      spacing: { section: '80px', element: '10px', card: '25px' },
      borderRadius: { button: '14px' },
    },
  },
  plugins: [],
}
