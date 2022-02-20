const bcrypt = require("bcryptjs");
const { User } = require("../../model");
const { Conflict } = require("http-errors");
const {nanoid} = require('nanoid');
const sendEmail = require('../../helper/sendEmail');

const BASE_URL = "https://api-br.herokuapp.com/api";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already exist");
  }

  const verificationToken = nanoid();

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await User.create({ name, email, password: hashPassword, verificationToken });

  sendEmail({
    to: email,
    subject: "Подтвердите Ваш email на сервисе Book Reader",
    html: `<table style="width:100%;margin-top:46px;border-top:2px solid #2086e0;background:#fff;text-align:center">
    <tbody>
    <tr>
        <td style="font-size:20px;font-weight:400;padding-top:120px;color:#303030">Подтверждения регистрации</td>
    </tr>
    <tr>
        <td style="font-size:36px;font-weight:800;">
        <a style="color: #ffffff;
        font-family: 'Helvetica Neue',helvetica,sans-serif;
        text-decoration: none;
        font-size: 14px;
        background: #0080cc;
        line-height: 32px;
        padding: 5px 20px;
        display: inline-block;
        border-radius: 3px;" target="_blank" href="${BASE_URL}/auth/email-verify/${verificationToken}">Подтвердить email</a></td>
    </tr>
    <tr>
        <td style="font-size:16px;font-weight:200;padding-top:30px;color:#303030">
            Для подтверждения регистрации аккаунта:
        </td>
    </tr>
    <tr>
        <td style="font-size:16px;font-weight:400;color:#303030;padding-bottom:108px;border-bottom:1px solid #eee">
            <a href="mailto:${email}" target="_blank">${email}</a>
        </td>
    </tr>
    <tr>
        <td style="font-size:13px;font-weight:200;color:#9b9b9b;padding-top:20px">
            Этот код действителен в течение 1 часа. Завершите регистрацию вовремя.
        </td>
    </tr>
    </tbody>
</table>`
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      message: "Register user successful",
      newUser: {
        name,
        email,
      },
    },
  });
};

module.exports = register;
