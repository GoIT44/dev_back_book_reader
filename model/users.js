const { Schema, model } = require("mongoose");
const Joi = require("joi");

const registerJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  token: Joi.string(),
  verify: Joi.boolean(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const usersSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String
    },
      verify: {
        type: Boolean,
        default: false,
      }
  }, {versionKey: false, timestamps: true})
  
const User = model("user", usersSchema);

module.exports = {
  registerJoiSchema,
  loginJoiSchema,
  User,
};
