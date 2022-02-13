const queryString = require('query-string');
const axios = require('axios');
const { User } = require('../../model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL} = process.env;

const googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent"
    });

    return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    )
}

const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
        url: 'https://oauth2.googleapis.com/token',
        method: "post",
        data: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
            grant_type: "authorization_code",
            code,
        }
    })
    const userData = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        }
    })

   return res.redirect(
        `${FRONTEND_URL}/google-auth?email=${userData.data.email}&id=${userData.data.id}&name=${userData.data.given_name}&last_name=${userData.data.family_name}&avatar=${userData.data.picture}`
    )
}

const googleAuthorization = async (req, res) => {
    const {email, name, last_name, id} = req.query;
    const password = email + id;

    const user = await User.findOne({email});

    if (user) {
        const payload = {
            id: user._id,
          };
          const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
          await User.findByIdAndUpdate(user._id, { token, verify: true });

        res.json({
            status: "success",
            code: 201,
            data: {
                message: "Успешная авторизация!",
                token
            }
        })
    }

    else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const payload = {
            id
          };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await User.create({ name: name+' '+last_name, email, password: hashPassword, token, verify: true});
        res.json({
            status: "success",
            code: 201,
            data: {
                message: "Успешная регистрация и авторизация пользователя!",
                token
            }
        })
    }
}

module.exports = {
    googleAuth,
    googleRedirect,
    googleAuthorization
}