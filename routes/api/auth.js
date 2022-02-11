import express from 'express';

import {controllerWrapper, validation, authentication} from '../middleware';
import {registerJoiSchema, loginJoiSchema} from '../model/users';

const router = express.Router();

router.post('/register', validation(registerJoiSchema), async (req, res) => {

})


router.post("/login", validation(loginJoiSchema), async (req, res) => {

})

router.get("/logout", authentication(), async (req, res) => {

})

module.exports = {router};

