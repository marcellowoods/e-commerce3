const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")

const mailgunAuth = {
    auth: {
        api_key: "key-12341234123412341234",
        domain: "One of your domain names listed at your https://mailgun.com/app/domains"
    }
}

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))

const template = handlebars.compile(emailTemplateSource)

const htmlToSend = template({ message: "Hello!" })

const mailOptions = {
    from: "myemail@example.com",
    to: "recipient@domain",
    subject: "EMAIL SUBJECT LINE",
    html: htmlToSend
}

smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
        console.log(error)
    } else {
        console.log("Successfully sent email.")
    }
})