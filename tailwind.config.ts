import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        charcoal: {
          DEFAULT: '#121212',
          light: '#1b1a19',
          line: '#2b2926',
        },
        ivory: {
          DEFAULT: '#ece4d2',
          dim: '#bbb3a1',
          faint: '#8b8475',
        },
        gold: {
          DEFAULT: '#b8975a',
          bright: '#d6b672',
          dim: '#7d6740',
        },
        blood: '#a24040',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-bengali)', 'Georgia', 'serif'],
        serif: ['var(--font-body)', 'var(--font-bengali)', 'Georgia', 'serif'],
        bengali: ['var(--font-bengali)', 'var(--font-body)', 'serif'],
      },
      maxWidth: {
        reading: '40rem',
      },
    },
  },
  plugins: [],
};

export default config;
