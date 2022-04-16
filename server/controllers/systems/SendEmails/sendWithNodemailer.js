const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;

var nodemailer = require('nodemailer');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../../.env') });

//what worked for unoutharized_client error
//I forget to click on the gear icon at oauth2 playground and insert my OAuth Client ID and OAuth Client Secret.
//BEFORE getting the refresh token
//https://github.com/nodemailer/nodemailer/issues/564

async function sendWithNodemailer(mailOptions) {

    const CLIENT_EMAIL = process.env.GMAIL_CLIENT_EMAIL;
    const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
    const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
    const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

    const OAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
    );

    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    try {
        // Generate the accessToken on the fly
        const accessToken = await OAuth2Client.getAccessToken();

        // Create the email envelope (transport)
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: CLIENT_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        // Set up the email options and delivering it
        const result = await transport.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error;
    }
}

module.exports = sendWithNodemailer;