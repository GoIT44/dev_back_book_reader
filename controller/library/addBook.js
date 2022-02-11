const {Library} = require('../../model');

const addBook = async (req, res) => {
    const {_id:id} = req.user;

    const newBook = {
        ...req.body,
        owner: id
    }

    const result = await Library.create(newBook);

    res.json({
        status: "success",
        code: 201,
        data: {
            message: "Book added successfully",
            result
        }
    })
}

module.exports = addBook;