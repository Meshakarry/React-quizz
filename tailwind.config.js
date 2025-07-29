/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      ubuntu: ['Ubuntu', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
				lg: '2rem'
      },
      screens: {
				'lg': '72rem',
				'2xl': '82rem',
			},
    },
    screens: {
			'xs': '400px',
			'sm': '576px',
			'md': '898px',
			'lg': '1200px',
			'xl': '1259px',
			'2xl': '1359px',
		},
  },
  plugins: [],
}

