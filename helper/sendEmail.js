const nodemailer = require('nodemailer');
const {MAILER_PASS} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "b-reader@meta.ua",
        pass: MAILER_PASS
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = {...data, from: "BookReader <b-reader@meta.ua>"};
    try {
        await transporter.sendMail(email);
        return true;
    }

    catch(error) {
        throw error
    }
};

module.exports = sendEmail;