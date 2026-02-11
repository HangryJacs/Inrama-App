/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0b0b0b', // Black
                secondary: '#ffffff', // White
                accent: '#6A6A6A', // Grey
                sale: '#e62f2f', // Red
                error: '#D02E2E',
                success: '#56AD6A',
                background: '#ffffff',
                'background-secondary': '#e6e6e6', // Light Grey
                'text-light': '#3e3e3e',
                'border-hairline': '#f7f7f7',
            },
            fontFamily: {
                sans: ['"Roboto Condensed"', 'sans-serif'],
            },
            spacing: {
                'site': '1440px',
                'site-narrow': '840px',
                'gutter': '60px',
                'gutter-mobile': '20px',
            },
            borderRadius: {
                DEFAULT: '0px',
                'pill': '25px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
