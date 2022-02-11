const express = require('express');

const {controllerWrapper, validation, authentication} = require('../../middleware');
const {library:ctrl} = require('../../controller');
const {libraryJoiSchema} = require('../../model/library');

const router = express.Router();

router.post('/addBook', validation(libraryJoiSchema), controllerWrapper(ctrl.addBook));

module.exports = router;