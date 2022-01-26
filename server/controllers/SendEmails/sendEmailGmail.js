var nodemailer = require('nodemailer');
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, '../../.env')});

// const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
//https://bbbootstrap.com/snippets/order-confirmation-email-template-19073214
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/emailTemplate.hbs"), "utf8");

const template = handlebars.compile(emailTemplateSource)

const htmlToSend = template({ message: "still trying out some  nodemailer things" });

const gmailUser = process.env.GMAIL_USER;
//pass is revoked
const gmailPass = process.env.GMAIL_PASS;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: gmailPass
    }
});

var mailOptions = {
    from: gmailUser,
    to: 'dabstone@protonmail.com',
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