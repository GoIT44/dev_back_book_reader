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
    dateResult: {
        type: Date,
    },
    pagesResult: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})



const Training = model('training', trainingSchema);


module.exports = {
    Training
}