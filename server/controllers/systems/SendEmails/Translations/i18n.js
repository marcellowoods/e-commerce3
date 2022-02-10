const i18next = require('i18next');
// if no language parameter is passed, let's try to use the node.js system's locale
// const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

i18next
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: require('./locales/en/translation.js')
            },
            bg: {
                translation: require('./locales/bg/translation.js')
            }
        }
    })

module.exports = (lng) => i18next.getFixedT(lng || "bg")
// module.exports = (lng) => i18next.getFixedT(lng || systemLocale)