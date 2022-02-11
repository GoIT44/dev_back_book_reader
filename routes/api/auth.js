const express = require("express");

const {
  controllerWrapper,
  validation,
  authentication,
} = require("../../middleware");
const { auth } = require("../../controller");
const { registerJoiSchema, loginJoiSchema } = require("../../model/users");

const router = express.Router();

router.post(
  "/register",
  validation(registerJoiSchema),
  controllerWrapper(auth.register)
);

router.post(
  "/login",
  validation(loginJoiSchema),
  controllerWrapper(auth.login)
);

router.get("/logout", authentication(), controllerWrapper(auth.logout));

module.exports = router;
