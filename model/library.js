const { Schema, model } = require("mongoose");
const Joi = require("joi");

const libraryJoiSchema = Joi.object({
    bookTitle: Joi.string().required(),
    author: Joi.string().required(),
    publicDate: Joi.string().required(),
    numbOfPages: Joi.number().required(),
    readStatus: Joi.string().valueOf('Going to read', 'Reading now', 'Already read')
})

const ratingJoiSchema = Joi.object({
    id: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string()
});

const librarySchema = Schema({
    bookTitle: {
        type: String,
        required: [true, 'The title of the book is required.'],
    },
    author: {
        type: String,
        required: [true, 'Book Author is required.']
    },
    publicDate: {
        type: String,
        required: [true, 'Year of publication of the book required']
    },
    numbOfPages: {
        type: Number,
        required: [true, 'Number of pages is required']
    },
    readStatus: {
        type: String,
        enum: ['Going to read', 'Reading now', 'Already read'],
        default: 'Going to read'
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {versionKey: false})

const Library = model('library', librarySchema);


module.exports = {
  Library,
  libraryJoiSchema,
  ratingJoiSchema
};
