import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "categories": "Categories",
            "home": "Home",
            "shop": "Shop",
            "contact": "Contact",
            "about": "About",
            "search": "Search"
        }
    },
    bg: {
        translation: {
            "categories": "Категории",
            "home": "Начало",
            "shop": "Магазин",
            "contact": "Контакти",
            "about": "За нас",
            "search": "Търсене"
        }
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