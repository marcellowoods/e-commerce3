import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "translated-paragraph": "We are going to translate this paragraph - how will it be in Polish?"
        }
    },
    pl: {
        translation: {
            "translated-paragraph": "Przetlumaczymy ten paragraf - jak to bedzie po Polsku?"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'pl',
        fallbackLng: 'en'
    });

export default i18n;