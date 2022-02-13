const express = require('express');

const {controllerWrapper, validation, authentication} = require('../../middleware');
const {library:ctrl} = require('../../controller');
const {libraryJoiSchema, ratingJoiSchema} = require('../../model/library');

const router = express.Router();

router.get('/', authentication(), controllerWrapper(ctrl.getBooks));

router.post('/addBook', authentication(), validation(libraryJoiSchema), controllerWrapper(ctrl.addBook));

router.post('/addReview', authentication(), validation(ratingJoiSchema), controllerWrapper(ctrl.addReview));

module.exports = router;