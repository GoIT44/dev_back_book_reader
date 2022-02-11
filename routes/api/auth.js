const express = require('express');

const {controllerWrapper, validation, authentication} = require('../../middleware');
const {registerJoiSchema, loginJoiSchema} = require('../../model/users');

const router = express.Router();

router.post('/register', async (req, res) => {

})

router.post("/login", async (req, res) => {

})

router.get("/logout", async (req, res) => {

})

module.exports = router;

