import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#102A43', deep: '#0B1F33', soft: '#1B3A57' },
        forest: '#14532D',
        emerald: '#10B981',
        lime: '#C7F36B',
        offwhite: '#F7F9F5',
        charcoal: '#202B33',
        mist: '#E8EFEC',
      },
      fontFamily: {
        display: ['"Sora Variable"', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '76rem' },
    },
  },
  plugins: [typography],
};

export default config;
