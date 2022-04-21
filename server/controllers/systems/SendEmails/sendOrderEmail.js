const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });
const compileTemplate = require("./compileTemplate");
const i18n = require('./Translations/i18n.js');

const sendWithNodemailer  = require("./sendWithNodemailer");

// var mailOptions = {
//     from: gmailUser,
//     to: 'dabstone@protonmail.com',
//     subject: 'trying out the mail send',
//     html: htmlToSend
// };

const sendOrderEmail = async (order, subject, message) => {

    const lang = order.deliveryInfo.lang;

    const t = i18n(lang);

    const fromEmail = process.env.GMAIL_CLIENT_EMAIL;

    //remove undefined fields
    const orderFiltered = JSON.parse(JSON.stringify(order));

    const email = orderFiltered.deliveryInfo.email;

    const htmlToSend = compileTemplate(orderFiltered, message);

    var mailOptions = {
        from: fromEmail,
        to: email,
        subject: t(subject),
        html: htmlToSend
    };


    // var mailOptions = {
    //     from: "from-example@email.com",
    //     to: "to-example@email.com",
    //     subject: 'trying out the mail send',
    //     html: htmlToSend
    // };

    await sendWithNodemailer(mailOptions);
}

const sendCreatedOrderEmail = async (order) => {

    const subject = "Accepted order";

    await sendOrderEmail(order, subject, "your order is accepted")
}

const sendShippedOrderEmail = async (order) => {

    const subject = "Order changed status";

    await sendOrderEmail(order, subject, "your order has been shipped")
}

exports.sendCreatedOrderEmail = sendCreatedOrderEmail;
exports.sendShippedOrderEmail = sendShippedOrderEmail;