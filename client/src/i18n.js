import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//to do
//detect user language
//https://react.i18next.com/latest/using-with-hooks
//https://lokalise.com/blog/how-to-internationalize-react-application-using-i18next/

const resources = {
    en: {
        translation: {
            "categories": "Categories",
            "home": "Home",
            "shop": "Shop",
            "contact": "Contact",
            "about": "About",
            "search": "Search",
            "cart": "Cart",
            "checkout": "Checkout",
            "cart is empty": "Cart is empty",
        }
    },
    bg: {
        translation: {
            "categories": "Категории",
            "home": "Начало",
            "shop": "Магазин",
            "contact": "Контакти",
            "about": "За нас",
            "search": "Търсене",
            "cart": "Кошница",
            "checkout": "Завърши поръчката",
            "cart is empty": "Кошницата е празна",
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