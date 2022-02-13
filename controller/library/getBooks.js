const {Library, Training} = require('../../model');

const getBooks = async (req, res) => {
    const {_id} = req.user;
    const books = await Library.find({owner: _id}, ['-owner']).lean();
    const training = await Training.findOne({owner: _id}, ['-owner']).lean();
    if (training) {
        if (new Date() > training.endTrain) {
            await Training.findOneAndDelete({owner: _id});
        }
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            message: 'Андрюха молодец, сделал правильный запрос',
            training,
            books
        }
    })
}


module.exports = getBooks;