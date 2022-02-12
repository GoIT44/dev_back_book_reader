const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const {googleAuth, googleRedirect} = require('./google');

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect
};
