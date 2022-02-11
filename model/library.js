const { Schema, model } = require("mongoose");
const Joi = require("joi");

const libraryJoiSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  yearOfPublic: Joi.date().required(),
  numbOfPages: Joi.number().required(),
});

const librarySchema = Schema({
  name: {
    type: String,
    required: [true, "The title of the book is required."],
  },
  author: {
    type: String,
    required: [true, "Book Author is required."],
  },
  yearOfPublic: {
    type: Date,
    required: [true, "Year of publication of the book required"],
  },
  numbOfPages: {
    type: Number,
    required: [true, "Number of pages is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Library = model("library", librarySchema);

module.exports = {
  Library,
  libraryJoiSchema,
};
