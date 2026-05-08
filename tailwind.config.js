/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
      },
      colors: {
        soc: {
          bg: '#000813',
          surface: '#010d1f',
          border: '#0d2d4e',
          primary: '#00d4ff',
          green: '#00ff88',
          purple: '#7928ca',
          text: '#e2f4ff',
          dim: '#4a7090',
        },
        photo: {
          bg: '#0a0805',
          surface: '#141008',
          border: '#2d2010',
          primary: '#f59e0b',
          pink: '#ec4899',
          text: '#fef3c7',
          dim: '#78716c',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

