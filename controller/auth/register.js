const bcrypt = require("bcryptjs");
const { User } = require("../../model");
const { BadRequest, Conflict } = require("http-errors");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      message: "Register user successful",
      newUser: {
        email,
        name,
      },
    },
  });
};

module.exports = register;
