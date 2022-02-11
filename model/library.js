const { Schema, model } = require("mongoose");
const Joi = require("joi");

const libraryJoiSchema = Joi.object({
    bookTitle: Joi.string().required(),
    author: Joi.string().required(),
    publicDate: Joi.date().required(),
    numbOfPages: Joi.number().required(),
    readStatus: Joi.string().valueOf('Going to read', 'Reading now', 'Already read')
})

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
        type: Date,
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
    owner: {
        // type: String
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {versionKey: false, timestamps: true})

const Library = model('library', librarySchema);


module.exports = {
  Library,
  libraryJoiSchema,
};
