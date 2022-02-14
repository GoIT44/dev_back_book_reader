const {Training, Library} = require('../../model');
const {BadRequest} = require('http-errors');

const addResult = async(req, res) => {
    const {_id} = req.user;
    const {dateResult, pagesResult} = req.body;

    if (pagesResult <= 0) {
        throw new BadRequest({
            status: "error",
            message: "Значение должно быть больше нуля"
        })
    }

    const training = await Training.findOne({owner: _id});

    if (!training) {
        throw new BadRequest('Тренинг не создан');
    }

    if (training.totalPages < (pagesResult + training.pagesResult)) {
        throw new BadRequest({
            status: "error",
            data: {
                message: "Не обнанывай, ты пытаешься передать больше страниц, чем их есть!",
                "Ты пытаешься передать": pagesResult + training.pagesResult,
                "Всего страниц": training.totalPages
            }
        })
    }

    else if (training.totalPages === (pagesResult + training.pagesResult)) {

        if (new Date() > training.endTrain) {
            await Training.findOneAndDelete({owner: _id});

            for (let i = 0; i < training.booksTrain.length; i++) {
                await Library.findByIdAndUpdate(training.booksTrain[i], {readStatus: 'Going to read'});
             };

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
        const date = new Date();
        let totalPagesResult = training.pagesResult + pagesResult;
        const time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        const newResult = [...training.result, {dateResult, time, pagesResult}];
        const newTraining = await Training.findOneAndUpdate({owner:_id}, {pagesResult: totalPagesResult, result: newResult}, {new: true});

        const bookIsRead = [];
        let countReadPages = 0;
        let obj;

        newTraining.trainingBooks.forEach(item => {
            bookIsRead.push(item);
            if (item.read) {
                countReadPages = totalPagesResult - item.numbOfPages;
            }
        })

    
        console.log(bookIsRead);
        console.log(countReadPages);

        for (let i = 0; i < bookIsRead.length; i++) {
            if(countReadPages) {
                console.log("Сейчас работает ветка с наличием прочитаной книги");
                if (!bookIsRead[0].read && bookIsRead[0].numbOfPages <= countReadPages) {
                    bookIsRead[0].read = true;
                    console.log("Вот эта книга прочитана:", bookIsRead[0].id);
                    await Training.findOneAndUpdate({owner: _id}, {trainingBooks: bookIsRead});
                    break;
                }
            }
            
            else {
                console.log("Сейчас работает ветка без прочитанных книг");
                if (!bookIsRead[0].read && bookIsRead[0].numbOfPages <= totalPagesResult) {
                    bookIsRead[0].read = true;
                    console.log("Вот эта книга прочитана:", bookIsRead[0].id);
                    await Training.findOneAndUpdate({owner: _id}, {trainingBooks: bookIsRead});
                    // await Library.findOneAndUpdate({})
                    break;
                }
            }
        }



        res.json({
            status: "success",
            code: 201,
            message:"Ты молодец, результат записан!!!",
             data: {
                newTraining
            }
        })
    }
}

module.exports = addResult;