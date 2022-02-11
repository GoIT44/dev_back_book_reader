const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {Unauthorized} = require('http-errors');
const {User} = require('../model');

const authentication = () => {
    return async(req, res, next) => {
        const {authorization} = req.headers;

        if (!authorization) {
            res.status(401).json({
                message: "Not authorized"
            });
            return;
        }
        const [bearer, token] = authorization.split(" ");

        if (bearer !== 'Bearer') {
            res.status(401).json({
                message: "Not authorized"
            });
            return;
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);

            if (!user || !user.token) {
                throw new Unauthorized('Not authorized');
            }
            req.user = user;
            next();
        }
        catch(error) {
            error.status = 401;
            next(error)
        }
      }
  };

module.exports = authentication;
