import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from "./locales/en/translation";
import translationBg from "./locales/bg/translation";

//to do
//detect user language
//https://react.i18next.com/latest/using-with-hooks
//https://lokalise.com/blog/how-to-internationalize-react-application-using-i18next/

const resources = {
    en: {
        translation: translationEn
    },
    bg: {
        translation: translationBg
    }
};


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'bg',
        fallbackLng: 'en'
    });

export default i18n;