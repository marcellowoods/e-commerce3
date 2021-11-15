module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            scale: {
                '200': '2',
                '250': '2.5',
                '300': '3',
                '350': '3.5',
                '400': '4',
            }
        }

    },
    variants: {
        extend: {},
    },
    plugins: [
        // ...
        require('@tailwindcss/forms'),
    ],
}
