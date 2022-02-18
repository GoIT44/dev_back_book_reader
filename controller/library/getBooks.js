const {Library, Training} = require('../../model');

const getBooks = async (req, res) => {
    const {_id} = req.user;
    const books = await Library.find({owner: _id}, ['-owner']).lean();
    const training = await Training.findOne({owner: _id}, ['-owner', '-booksTrain']).lean();

    if (training) {
        if (new Date() > training.endTrain) {
            for (let i = 0; i < training.booksTrain.length; i++) {
                await Library.findByIdAndUpdate(training.booksTrain[i], {readStatus: 'Going to read'});
             };
            await Training.findOneAndDelete({owner: _id});
        }
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            userName: req.user.name,
            training,
            books

        }
    })
}


module.exports = getBooks;