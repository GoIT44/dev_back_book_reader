const {Schema, model} = require("mongoose");
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
    password: Joi.string().required()
})

const usersSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String
    },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      }
  }, {versionKey: false, timestamps: true})

  const User = model("user", usersSchema);

  module.exports = {
    registerJoiSchema,
    loginJoiSchema,
    User
};