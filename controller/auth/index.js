const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const {googleAuth, googleRedirect} = require('./google');
const emailVerify = require('./emailVerify');

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
  emailVerify
};
