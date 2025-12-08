/* Tailwind configuration moved to external file */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#0f172a',
                    accent: '#38bdf8',
                    secondary: '#818cf8'
                }
            },
            keyframes: {
                typing: {
                    '0%': { width: '0' },
                    '100%': { width: '100%' },
                },
                blink: {
                    '50%': { borderColor: 'transparent' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            animation: {
                typing: 'typing 3.5s steps(40, end), blink .75s step-end infinite',
                float: 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
            }
        }
    }
};
