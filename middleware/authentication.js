const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { Unauthorized } = require("http-errors");
const { User } = require("../model");

const authentication = () => {
  return async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      const error = new Unauthorized();
      next(error);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        const error = new Unauthorized();
        next(error);
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      next(error);
    }
  };
};

module.exports = authentication;
