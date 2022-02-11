const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');

const authentication = () => {
    return async(req, res, next) => {

    }
}

module.exports = authentication;