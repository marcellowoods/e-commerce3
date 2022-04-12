const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

var nodemailer = require('nodemailer');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject();
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    return transporter;
};

//gmail
const sendWithNodemailer = async (emailOptions) => {

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
};

//mailtrap
// const sendWithNodemailer = async (emailOptions) => {
//     const mailTrapUser = process.env.MAILTRAP_USER;
//     const mailTrapPass = process.env.MAILTRAP_PASS;

//     var transporter = nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: mailTrapUser,
//             pass: mailTrapPass
//         }
//     });

//     await transporter.sendMail(emailOptions);
// };

module.exports = sendWithNodemailer;