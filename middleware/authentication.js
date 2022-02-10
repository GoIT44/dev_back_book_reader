import jwt from 'jsonwebtoken';
const {SECRET_KEY} = process.env;
import {Unauthorized} from 'http-errors';

const authentication = () => {
    return async(req, res, next) => {

    }
}

export default authentication;