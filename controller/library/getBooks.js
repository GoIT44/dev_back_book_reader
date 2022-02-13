const {Library} = require('../../model');

const getBooks = async (req, res) => {
    const {_id} = req.user;
    const books = await Library.find({owner: _id}, ['-owner']).lean();
    res.json({
        status: 'success',
        code: 200,
        data: {
            message: 'Андрюха молодец, сделал правильный запрос',
            books
        }
    })
}


module.exports = getBooks;