const { User } = require("../../model");


const emailVerify = async (req, res) => {
    const {verificationToken} = req.params;

    const userVerify = await User.findOneAndUpdate({verificationToken}, {verify: true, verificationToken: null});

    if (userVerify) {
        res.json({
            status: "success",
            code: 200,
            message: "Email verify successfuly"
        })
    }

    else {
        res.json({
            status: "error",
            code: 400,
            message: "This token is undefined"
        })
    }
}

module.exports = emailVerify;