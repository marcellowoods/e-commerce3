module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            scale: {
                '200': '2',
                '250': '2.5',
            }
        }

    },
    variants: {
        extend: {},
    },
    plugins: [],
}
