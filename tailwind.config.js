/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                xs: 'var(--font-xsmall)',
                s: 'var(--font-small)',
                m: 'var(--font-medium)',
                l: 'var(--font-large)',
                xl: 'var(--font-xlarge)',
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    light: 'var(--color-secondary-light)',
                    dark: 'var(--color-secondary-dark)',
                },
                danger: {
                    DEFAULT: 'var(--color-danger)',
                    light: 'var(--color-danger-light)',
                    dark: 'var(--color-danger-dark)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    light: 'var(--color-success-light)',
                    dark: 'var(--color-success-dark)',
                },
                disable: {
                    DEFAULT: 'var(--color-disable)',
                    light: 'var(--color-disable-light)',
                },
                area: {
                    DEFAULT: 'var(--color-area)',
                    gray: 'var(--color-area-gray)',
                },
                dot: {
                    black: 'var(--color-black)',
                    'gray-dark': 'var(--color-gray-dark)',
                    'gray-light': 'var(--color-gray-light)',
                    white: 'var(--color-white)',
                },
            },
            boxShadow: {
                none: '',
                s: 'var(--box-shadow-small)',
                m: 'var(--box-shadow-medium)',
                l: 'var(--box-shadow-large)',
            },
            borderRadius: {
                none: '0',
                'dot-s': 'var(--border-radius-small)',
                'dot-m': 'var(--border-radius-medium)',
                'dot-l': 'var(--border-radius-large)',
                full: '9999px',
            },
            space: {
                xs: 'var(--space-xsmall)',
                s: 'var(--space-small)',
                m: 'var(--space-small)',
                l: 'var(--space-large)',
                xl: 'var(--space-xlarge)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
