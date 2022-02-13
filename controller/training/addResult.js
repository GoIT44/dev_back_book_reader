const {Training, Library} = require('../../model');
const {BadRequest} = require('http-errors');

const addResult = async(req,res)=>{
    const {_id} = req.user;
    const {dateResult, pagesResult} = req.body;

    if (pagesResult <= 0) {
        res.status(400).json({
            status: "error",
            code: 400,
            message: "Значение должно быть больше нуля"
        })
        return
    }

    const training = await Training.findOne({owner: _id});

    if (!training) {
        throw new BadRequest('Тренинг не создан');
    }

    if (training.totalPages < (pagesResult + training.pagesResult)) {
        res.status(400).json({
            status: "error",
            code: 400,
            data: {
                message: "Не обнанывай, ты пытаешься передать больше страниц, чем их есть!",
                "Ты пытаешься передать": pagesResult + training.pagesResult,
                "Всего страниц": training.totalPages
            }
        });
        return
    }

    else if (training.totalPages = (pagesResult + training.pagesResult)) {
        if (new Date() > training.endTrain) {
            await Training.findOneAndDelete({owner: _id});
            res.json({
                status: "success",
                code: 201,
                message: "Ти молодчина, але потрібно швидше! Наступного разу тобі все вдасться)"
            })
        }
        else {
            await Training.findOneAndDelete({owner: _id});

            for (let i = 0; i < training.booksTrain.length; i++) {
                await Library.findByIdAndUpdate(training.booksTrain[i], {readStatus: 'Already read'});
             };
    
            res.json({
                status: "success",
                code: 201,
                message: "Ти молодчина! Ти встиг пройти тренінг вчасно!"
            })
    }
    }

    else {
        let totalPagesResult = training.pagesResult + pagesResult;
        await Training.findOneAndUpdate({owner:_id}, {dateResult, pagesResult: totalPagesResult});
        res.json({
            status: "success",
            code: 201,
            message:"Ты молодец, но надо лучше!!!",
            data:{
                dateResult,
                pagesResult: totalPagesResult,
                totalPages: training.totalPages
            }
        })
    }
}

module.exports = addResult;