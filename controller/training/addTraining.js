const {Training, Library} = require('../../model');
const {BadRequest} = require('http-errors');

const addTraining = async (req, res) => {
    const {_id} = req.user;
    const {startTrain, endTrain, booksTrain} = req.body;

    const training = await Training.findOne({owner: _id});

    if (training) {
        throw new BadRequest({
            status: "error",
            message: "Тренинг уже добавлен, заверши предыдуший перед добавлением нового"
        })
    }

    let totalPages = 0;
    let trainingBooks = [];

    for (let i = 0; i < booksTrain.length; i++) {
       const library = await Library.findByIdAndUpdate(booksTrain[i], {readStatus: 'Reading now'});
       if (!library) {
            throw new BadRequest({
            status: "error",
            message: "Ты передаешь id не существующих книг. Проверь правильность id"
        })
       }
       totalPages += library.numbOfPages;
       trainingBooks = [
            ...trainingBooks,   
            {
                id: booksTrain[i],
                numbOfPages: library.numbOfPages,
                read: false
            }
        ]
    };

    const newTraining = {
        startTrain,
        endTrain,
        trainingBooks,
        booksTrain,
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
            trainingBooks,
            totalPages
        }
    })
}

module.exports = addTraining;