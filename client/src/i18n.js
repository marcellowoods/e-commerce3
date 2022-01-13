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
            "lv.": "lv.",


            "delivery to office": "Delivery to {{name}} office",
            "delivery to home": "Delivery to home",
            "delivery courrier": "Delivery Courrier",
            "delivery method": "Delivery Method",
            "orders": "Orders",
            "next": "Next",
            "back": " Back",
            "find": "Find",
            "office": "office",
            "office address": "{{name}} office address",
            "delivery address": "Delivery Address",
            "contact information": "Contact Information",
            "fill in the office address and your contact information to finish the order":
                "Fill in the office address and your contact information to finish the order",
            "fill in your address and contact information to finish the order":
                "Fill in your address and contact information to finish the order",
            "order": "Order",
            "total": "total",
            "deliver to": "Deliver to",
            "phone": "Phone",
            "address": "address",
            "cancel": "Cancel",
            "confirm": "Confirm",
            "order successful": "Order successful",
            "your order has been successfully submitted. We’ve sent you an email with all of the details of your order.":
                "Your order has been successfully submitted. We’ve sent you an email with all of the details of your order.",

            "settings": "Settings",
            "logout": "Logout",
            "login": "Login",
            "register": "Register",
            "products": "Products",
            "categories": "Categories",

            "product information": "Product Information",
            "description": "Description",
            "add to bag": "Add to bag",

            "order id": "Order Id",
            "created on": " Created on",
            "shipping address": "Shipping address",
            "status": "Status",
            "details": "Details",
            "type": "Type",
            "new": "new",
            "best sellers": "best sellers",
            "size": "size",
            "custom": "custom",
            "cm.": "cm.",
            "small": "small",
            "large": "large"
        }
    },
    bg: {
        translation: {

            "Not Processed": "Не обработена",
            "Processing": "Обравотва се",
            "Dispatched": "Изпратена",
            "Cancelled": "Отменена",
            "Completed": "Завършена",
            
            "categories": "Категории",
            "home": "Начало",
            "shop": "Магазин",
            "contact": "Контакти",
            "about": "За нас",
            "search": "Търсене",
            "cart": "Кошница",
            "checkout": "Поръчка",
            "cart is empty": "Кошницата е празна",
            "lv.": "лв.",

            "delivery to office": "Доставка до офис на {{name}}",
            "delivery to home": "Доставка до дома",
            "delivery courrier": "Куриер за доставка",
            "delivery method": "Място за доставка",
            "orders": "Поръчки",
            "next": "Продължи",
            "back": "Назад",
            "find": "Намери",
            "office": "офис",
            "office address": "{{name}} офис адрес",
            "delivery address": "Адрес за доставка",
            "contact information": "Данни за връзка",
            "fill in the office address and your contact information to finish the order":
                "Попълнете адреса на офиса и вашите данни за връзка за да завършите поръчката",
            "fill in your address and contact information to finish the order":
                "Попълнете вашия адрес и данни за връзка за да завършите поръчката",
            "order": "Поръчка",
            "total": "общо",
            "deliver to": "Доставка за",
            "phone": "телефон",
            "address": "адрес",
            "cancel": "Откажи",
            "confirm": "Потвърди",
            "order successful": "Създадена поръчка",
            "your order has been successfully submitted. We’ve sent you an email with all of the details of your order.":
                "Поръчката е създадена успешно, изпратихме ви email с детайлите на вашата поръчка.",

            "settings": "Настройки",
            "logout": "Излез",
            "login": "Влез",
            "register": "Регистрация",
            "products": "Продукти",
            "categories": "Категории",

            "product information": "Информация за продукт",
            "description": "Описание",
            "add to bag": "Добави в кошница",

            "order id": "Номер на поръчка",
            "created on": "Създадена на",
            "shipping address": "Адрес за доставка",
            "status": "Статус",
            "details": "Детайли",
            "type": "Тип",
            "new": "нови",
            "best sellers": "най-продавани",
            "size": "размер",
            "custom": "персонализиран",
            "cm.": "см.",
            "small": "малък",
            "large": "голям"
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