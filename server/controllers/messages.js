
const  sendWithNodemailer  = require("./systems/SendEmails/sendWithNodemailer");

const myEmail = process.env.GMAIL_CLIENT_EMAIL;

exports.sendMessage = async (req, res) => {

    console.log(process.env);

    try {

        

        const {
            message,
            email,
            name
        } = req.body;

        const messageToSend = message + `\nfrom ${name} ${email}`;

        var mailOptions = {
            from: myEmail,
            to: myEmail,
            subject: "message",
            text: messageToSend
        };

        console.log("in sendMessage")

        const result = await sendWithNodemailer(mailOptions);
        console.log(result);

        res.json({ ok: true });

    } catch (err) {

        res.status(400).json({
            err: err.message,
        });
    }

};