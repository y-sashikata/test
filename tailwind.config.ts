import type { Config } from 'tailwindcss'

export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './content/**/*.{md,json,yml,yaml}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

