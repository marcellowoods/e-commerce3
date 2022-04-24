const i18n = require('./Translations/i18n.js');
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/OrderTemplate.hbs"), "utf8");
const template = handlebars.compile(emailTemplateSource);


const getTranslatedField = (obj, field, forLang) => {

    //see product and category models in backend 

    const translations = obj.translations;

    if (translations) {
        const translationsForLang = translations.find(({ lang }) => lang == forLang);

        if (translationsForLang && (field in translationsForLang)) {
            const translatedField = translationsForLang[field];
            return translatedField;
        }
    }

    const notTranslatedField = obj[field];
    return notTranslatedField;

}

//example input

// const products = [
//     { name: "g shock", selectedCount: 3, priceTimesCount: 200, },
//     { name: "casio", selectedCount: 2, priceTimesCount: 100 },
// ];
// const deliveryInfo = {
//     method: "office",
//     city: "some sity",
//     address: "address 2",
//     phone: "1234",
//     email: "test@mail.com",
//     name: "Somename",
//     courrier: "econt",
// };

// const totalCost = 300;
// const totalCost = "en";


const getLocaleDate = (dateStr, lang) => {

    let options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        month: 'long',

    }
    let date = new Date(dateStr);
    return date.toLocaleDateString(lang, options);
}

const compileTemplate = (order, message) => {

    const {
        deliveryInfo,
        products,
        totalCost,
        shippingCost,
        _id: orderId,
        createdAt: orderCreatedAt,
    } = order;

    const lang = deliveryInfo.lang;

    const t = i18n(lang);

    const renderSize = (selectedSize) => {

        const { sizeText, sizeValue } = selectedSize;
        let text = t(sizeText) + " " + t("size") + "," + sizeValue + " " + t("cm.");;
        return text;
    }

    const renderDeliveryMethod = (method, courrier) => {

        return method === "office" ? t("delivery to office", { name: courrier }) : t("delivery to home");
    }

    const messageTranslate = t(message);

    const orderIdTranslate = t("order id") + ": " + orderId;
    const orderCreatedAtTranslate = t("created on") + ": " + getLocaleDate(orderCreatedAt, lang);

    const moneyMarkTranslate = t("lv.");
    const totalTranslate = t("total");
    const shippingTranslate = t("shipping cost");

    const translatedProducts = products.map(product => {

        const priceTimesCount = product.priceTimesCount;
        let name = getTranslatedField(product.product, "name", lang);

        let size = "";

        if ("selectedSize" in product) {

            size = " " + renderSize(product["selectedSize"]);
        }

        return {
            name,
            size,
            selectedCount: product.selectedCount,
            priceTimesCount,
        }

    })

    const deliveryTypeTranslate = renderDeliveryMethod(deliveryInfo.method, deliveryInfo.courrier);

    const htmlToSend = template({

        messageTranslate,
        orderIdTranslate,
        orderCreatedAtTranslate,
        moneyMarkTranslate,
        totalTranslate,
        shippingTranslate,

        products: translatedProducts,
        totalCost,
        shippingCost,
        deliveryInfo,
        deliveryTypeTranslate
    });

    return htmlToSend;

}

module.exports = compileTemplate;