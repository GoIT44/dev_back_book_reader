const { Schema, model } = require("mongoose");
const Joi = require("joi");

const trainingSchema = Schema({
    startTrain: {
        type: Date,
    },
    endTrain: {
        type: Date,
        required: [true, 'End of training field is required']
    },
    booksTrain: {
        type: Array,
        required: [true, 'Book is required']
    },
    totalPages: {
        type: Number
    },
    pagesResult: {
        type: Number,
        default: 0
    },
    result: {
        type: Array
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {versionKey: false})



const Training = model('training', trainingSchema);


module.exports = {
    Training
}