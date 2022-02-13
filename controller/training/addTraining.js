const {Training, Library} = require('../../model');

const addTraining = async (req, res) => {
    const {_id} = req.user;
    const {startTrain, endTrain, booksTrain} = req.body;


    let totalPages = 0;
    for (let i = 0; i < booksTrain.length; i++) {
       const pages = await Library.findByIdAndUpdate(booksTrain[i], {readStatus: 'Reading now'});
       totalPages += pages.numbOfPages
    };

    const newTraining = {
        ...req.body,
        totalPages,
        owner: _id
    }
    
    await Training.create(newTraining);

    res.json({
        status: "success",
        code: 201,
        data: {
            startTrain, 
            endTrain,
            booksTrain,
            totalPages
        }
    })
}

module.exports = addTraining;