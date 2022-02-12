var nodemailer = require('nodemailer');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });
const compileTemplate = require("./compileTemplate");


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


const sendOrderEmail = (order, message) => {


    //remove undefined fields
    const orderFiltered = JSON.parse(JSON.stringify(order));

    const htmlToSend = compileTemplate(orderFiltered, message);

    var mailOptions = {
        from: "from-example@email.com",
        to: "to-example@email.com",
        subject: 'trying out the mail send',
        html: htmlToSend
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendCreatedOrderEmail = (order) => {

    sendOrderEmail(order, "your order is accepted")
}

const sendShippedOrderEmail = (order) => {

    sendOrderEmail(order, "your order has been shipped")
}

exports.sendCreatedOrderEmail = sendCreatedOrderEmail;
exports.sendShippedOrderEmail = sendShippedOrderEmail;