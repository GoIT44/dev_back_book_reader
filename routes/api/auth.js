const express = require("express");

const {
  controllerWrapper,
  validation,
  authentication,
} = require("../../middleware");
const { auth } = require("../../controller");
const { registerJoiSchema, loginJoiSchema } = require("../../model/users");

const router = express.Router();

router.post("/register",validation(registerJoiSchema), controllerWrapper(auth.register));

router.post("/login", validation(loginJoiSchema), controllerWrapper(auth.login));

router.get("/logout", authentication(), controllerWrapper(auth.logout));

router.get('/google', controllerWrapper(auth.googleAuth));

router.get('/google-redirect', controllerWrapper(auth.googleRedirect));

router.get('/email-verify/:verificationToken', controllerWrapper(auth.emailVerify));


module.exports = router;
