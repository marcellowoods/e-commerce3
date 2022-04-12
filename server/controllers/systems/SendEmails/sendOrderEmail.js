const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });
const compileTemplate = require("./compileTemplate");

const sendWithNodemailer  = require("./sendWithNodemailer");

// var mailOptions = {
//     from: gmailUser,
//     to: 'dabstone@protonmail.com',
//     subject: 'trying out the mail send',
//     html: htmlToSend
// };

const sendOrderEmail = async (order, message) => {

    const fromEmail = process.env.EMAIL;

    //remove undefined fields
    const orderFiltered = JSON.parse(JSON.stringify(order));

    const htmlToSend = compileTemplate(orderFiltered, message);

    var mailOptions = {
        from: fromEmail,
        to: 'dabstone@protonmail.com',
        subject: 'trying out the mail send',
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

    await sendOrderEmail(order, "your order is accepted")
}

const sendShippedOrderEmail = async (order) => {

    await sendOrderEmail(order, "your order has been shipped")
}

exports.sendCreatedOrderEmail = sendCreatedOrderEmail;
exports.sendShippedOrderEmail = sendShippedOrderEmail;