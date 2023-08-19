/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'jimmy-lite': {
          100: '#ffffff',
          200: '#f5f4fa',
        },
        'jimmy-night': {
          700: '#424242',
          800: '#303030',
        }
      },
    },
  },
  plugins: [],
}

