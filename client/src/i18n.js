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
            "delivery to office": "Delivery to {{name}} office",
            "delivery to home": "Delivery to home",
            "delivery courrier": "Delivery Courrier",
            "delivery method": "Delivery Method",
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
            "checkout": "Поръчка",
            "cart is empty": "Кошницата е празна",
            "delivery to office": "Доставка до офис на {{name}}",
            "delivery to home": "Доставка до дома",
            "delivery courrier": "Куриер за доставка",
            "delivery method": "Място за доставка",
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