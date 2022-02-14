const express = require('express');

const {controllerWrapper, validation, authentication} = require('../../middleware');
const {library, training} = require('../../controller');
const {Training} = require('../../model');

const router = express.Router();

router.get('/', authentication(), controllerWrapper(library.getBooks));

router.post('/addTraining', authentication(), controllerWrapper(training.addTraining));

router.post('/addResult', authentication(), controllerWrapper(training.addResult));

module.exports = router;