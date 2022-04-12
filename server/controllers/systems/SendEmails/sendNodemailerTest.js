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

    const fromEmail = process.env.EMAIL;


    var mailOptions = {
        from: fromEmail,
        to: 'dabstone@protonmail.com',
        subject: 'trying out the mail send',
        text: "I am sending an email from nodemailer!",
    };

    try {
        await sendWithNodemailer(mailOptions);
    }catch(err){
        console.log("error")
        console.log(err);
    }

}

sendEmail();

