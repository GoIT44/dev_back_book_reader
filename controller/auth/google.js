const queryString = require('query-string');
const axios = require('axios');

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

    console.log(userData.data);

   return res.redirect(
        `${FRONTEND_URL}/google-redirect?email=${userData.data.email}&name=${userData.data.given_name}$last_name=${userData.data.family_name}&avatar=${userData.data.picture}`
    )
}

module.exports = {
    googleAuth,
    googleRedirect
}