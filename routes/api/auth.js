const express = require('express');

const {controllerWrapper, validation, authentication} = require('../../middleware');
const {registerJoiSchema, loginJoiSchema} = require('../../model/users');

const router = express.Router();

router.post('/register', async (req, res) => {

})

router.post("/login", controllerWrapper())

router.get("/logout",  async (req, res) => {

})

module.exports = router;

