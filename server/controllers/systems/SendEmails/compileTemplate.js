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
const compileTemplate = (deliveryInfo, products, totalCost) => {

    const lang = deliveryInfo.lang;

    const t = i18n(lang);

    const renderSize = (selectedSize) => {

        const {sizeText, sizeValue} = selectedSize;
        let text = t(sizeText) + " " + t("size") + "," + sizeValue + " " + t("cm.");;
        return text;
    }

    const renderDeliveryMethod = (method, courrier) => {

        return method === "office" ? t("delivery to office", { name: courrier }) : t("delivery to home");
    }

    const messageTranslate = t("your order is accepted");
    const moneyMarkTranslate = t("lv.");
    const totalTranslate = t("total");

    const translatedProducts = products.map(product => {

        const priceTimesCount = product.priceTimesCount + " " + moneyMarkTranslate;
        let name = getTranslatedField(product.product, "name", lang);
        
        let size = "";

        if("selectedSize" in product){
            
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
        moneyMarkTranslate,
        totalTranslate,

        products: translatedProducts,
        totalCost,
        deliveryInfo,
        deliveryTypeTranslate
    });

    return htmlToSend;

}

module.exports = compileTemplate;