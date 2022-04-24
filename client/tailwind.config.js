//change fonts
//first laod the font in index.html!
//just add font-{fontname} in className
//https://www.themes.dev/blog/typographic-defaults-in-tailwind-css/
//https://fonts.google.com/

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
            },
            fontFamily: {
                'robo': ['Roboto'],
                'workSans': ['Work Sans'],
                'slick': ['Sacramento']
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
