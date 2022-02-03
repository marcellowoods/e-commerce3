var nodemailer = require('nodemailer');
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });


const mailTrapUser = process.env.MAILTRAP_USER;
//pass is revoked
const mailTrapPass = process.env.MAILTRAP_PASS;

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: mailTrapUser,
        pass: mailTrapPass
    }
});

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/OrderCreateTemplate.hbs"), "utf8");

const template = handlebars.compile(emailTemplateSource);

const products = [
    { name: "g shock", selectedCount: 3, priceTimesCount: 200,  },
    { name: "casio", selectedCount: 2, priceTimesCount: 100 },
];
const deliveryInfo = {
    method: "office",
    city: "some sity",
    address: "address 2",
    phone: "1234",
    email: "test@mail.com",
    name: "Somename",
    courrier: "econt",
};

const totalCost = 300;

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



const sendOrderCreatedEmail = (order) => {

    const language = "bg";

    const {deliveryInfo, products, totalCost} = order;

    const translatedProducts = products.map(product => {
        const translatedName = getTranslatedField(product.product, "name", language);
        return {...product, name: translatedName};
    })

    console.log("translated")
    console.log(products);


    // const htmlToSend = template({
    //     message: "your order has been created",
    //     translatedProducts,
    //     totalCost,
    //     deliveryInfo,
    // });

    // var mailOptions = {
    //     from: "from-example@email.com",
    //     to: "to-example@email.com",
    //     subject: 'trying out the mail send',
    //     html: htmlToSend
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
}

module.exports = sendOrderCreatedEmail