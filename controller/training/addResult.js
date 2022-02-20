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

            for (let i = 0; i < training.trainingBooks.length; i++) {
                if (!training.trainingBooks[i].read) {
                    await Library.findByIdAndUpdate(training.trainingBooks[i].id, {readStatus: 'Going to read'});
                }
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
                if (training.readStatus === 'Reading now') {
                    await Library.findByIdAndUpdate(training.booksTrain[i], {readStatus: 'Already read'});
                }
             };
    
            res.json({
                status: "success",
                code: 201,
                message: "Ти молодчина! Ти встиг пройти тренінг вчасно!"
            })
        }
    }

    else {

        if (new Date() > training.endTrain) {
            await Training.findOneAndDelete({owner: _id});
            for (let i = 0; i < training.trainingBooks.length; i++) {
                if (!training.trainingBooks[i].read) {
                    await Library.findByIdAndUpdate(training.trainingBooks[i].id, {readStatus: 'Going to read'});
                }
             };

            res.json({
                status: "success",
                code: 201,
                message: "Ти молодчина, але потрібно швидше! Наступного разу тобі все вдасться)"
            })
        }

        const date = new Date();
        let totalPagesResult = training.pagesResult + pagesResult;
        const time = date.getHours().toString().padStart(2, '0')+':'+date.getMinutes().toString().padStart(2, '0')+':'+date.getSeconds().toString().padStart(2, '0');
        const newResult = [...training.result, {dateResult, time, pagesResult}];
        const newTraining = await Training.findOneAndUpdate({owner:_id}, {pagesResult: totalPagesResult, result: newResult}, {new: true});

        const bookIsRead = [];
        let countReadPages = 0;

        bookIsRead.push(...newTraining.trainingBooks);

        newTraining.trainingBooks.forEach(item => {
            if (item.read) {
                countReadPages += item.numbOfPages;
            }
        })
        
        countReadPages = totalPagesResult - countReadPages;

        for (let i = 0; i < bookIsRead.length; i++) {
            if(countReadPages) {
                if (!bookIsRead[i].read) {
                    if (bookIsRead[i].numbOfPages <= countReadPages){
                        bookIsRead[i].read = true;
                        await Library.findByIdAndUpdate(bookIsRead[i].id, {readStatus: 'Already read'});
                        await Training.findOneAndUpdate({owner: _id}, {trainingBooks: bookIsRead});
                        break;
                    }
                    if  (bookIsRead[i].numbOfPages > countReadPages) {
                        break 
                    }
                }
            }

            if (!bookIsRead[i].read) {
                if (bookIsRead[i].numbOfPages <= totalPagesResult){
                    bookIsRead[i].read = true;
                    await Library.findByIdAndUpdate(bookIsRead[i].id, {readStatus: 'Already read'});
                    await Training.findOneAndUpdate({owner: _id}, {trainingBooks: bookIsRead});
                    break
                }
             if  (bookIsRead[i].numbOfPages > totalPagesResult) {
                 break
                }
            }
        }

        res.json({
            status: "success",
            code: 201,
            message:"Ты молодец, результат записан!!!",
             data: {
                training: newTraining
            }
        })
    }
}

module.exports = addResult;