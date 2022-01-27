var nodemailer = require('nodemailer');
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, '../../../.env')});


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

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/orderEmailTemplate.hbs"), "utf8");

const template = handlebars.compile(emailTemplateSource);

const htmlToSend = template({ message: "still trying out some nodemailer things" });

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