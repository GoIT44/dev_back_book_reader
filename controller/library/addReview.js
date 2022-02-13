const {Library} = require('../../model');

const addReview = async (req, res) => {
    const {id, rating, comment} = req.body;

   await Library.findByIdAndUpdate(id, {rating, comment});

    res.json({
        status: 'success',
        code: 201,
        data: {
            message: "Review added successful",
            rating,
            comment
        }
    })

    
}

module.exports = addReview;