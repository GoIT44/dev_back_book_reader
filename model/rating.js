const {Schema, model} = require("mongoose");
const Joi = require("joi");

const ratingJoiSchema = Joi.object({
    rating: Joi.string(),
    comment: Joi.string()
})

const ratingSchema = Schema({
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    comment: {
        type: String,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'library',
    }
})


module.exports = {
    ratingSchema,
    ratingJoiSchema 
}

