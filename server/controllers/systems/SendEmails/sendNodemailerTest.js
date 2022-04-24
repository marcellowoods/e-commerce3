const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../../.env') });

const sendWithNodemailer = require("./sendWithNodemailer");

// var mailOptions = {
//     from: gmailUser,
//     to: 'dabstone@protonmail.com',
//     subject: 'trying out the mail send',
//     html: htmlToSend
// };

const sendEmail = async () => {

    const fromEmail = process.env.CLIENT_EMAIL;


    var mailOptions = {
        from: fromEmail,
        to: 'dabstone@protonmail.com',
        subject: 'trying out the mail send',
        text: "I am sending an email from nodemailer!",
    };

    sendWithNodemailer(mailOptions)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

}

sendEmail();

