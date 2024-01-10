/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                '13px': '13px',
            },
            animation: {
                'loading-ripple': 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
            },
            width: {
                18: '72px',
                30: '120px',
            },
            height: {
                18: '72px',
                30: '120px',
            },
            keyframes: {
                ripple: {
                    '0%': {
                        top: '36px',
                        left: '36px',
                        width: 0,
                        height: 0,
                        opacity: 0,
                    },
                    '4.9%': {
                        top: '36px',
                        left: '36px',
                        width: 0,
                        height: 0,
                        opacity: 0,
                    },
                    '5%': {
                        top: '36px',
                        left: '36px',
                        width: 0,
                        height: 0,
                        opacity: 1,
                    },
                    '100%': {
                        top: 0,
                        left: 0,
                        width: '72px',
                        height: '72px',
                        opacity: 0,
                    },
                },
            },
            zIndex: {
                999: '999',
            },
            colors: {
                neutral: {
                    50: '#F8F9FA',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D2D6DB',
                    400: '#9DA4AE',
                    500: '#6C737F',
                    600: '#2d3748',
                    700: '#1C2536',
                    800: '#111927',
                    900: '#0e1320',
                },
                indigo: {
                    lightest: '#F5F7FF',
                    light: '#EBEEFE',
                    main: '#6366F1',
                    dark: '#4338CA',
                    darkest: '#312E81',
                    contrastText: '#FFFFFF',
                },
            },
        },
    },
    plugins: [],
};
