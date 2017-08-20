const conn = require('../lib/db');

function startQuiz(userId, deckId, done) {
    const sql = `SELECT d.id as deckId, c.id as cardId, d.name, c.question
    FROM decks d JOIN cards c ON d.Id = c.deckId
    WHERE d.id = ? and d.active = true and d.userId = ?`
    conn.query(sql, [deckId, userId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Error retrieving question.', err)
            let temp = {
                status: "fail",
                message: "Unable to retrieve question.",
                data: {}
            }
            done(temp)
        }
        else {
            let result = results[Math.floor(Math.random() * results.length)];
            let temp = {
                status: "success",
                message: "Your question is.",
                question: result,
                showAnswer: "/api/decks/" + deckId + "/answer/" + result.cardId
            }
            done(temp)
        }
    })
}

function showAnswer(deckId, cardId, done) {
    const sql = `SELECT deckId, id, question, answer
    FROM cards WHERE deckId = ? and id = ? and active = true`
    let res = {
        status: "",
        message: "",
        answer: "",
        storeResult: ""
    }
    conn.query(sql, [deckId, cardId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Error retrieving answer', err)
            let temp = {
                status: "fail",
                message: "Unable to retrieve answer."
            }
            done(temp)
        }
        else {
            let temp = {
                status: "success",
                message: "Here is your answer.",
                answer: results,
                storeResult: "/api/decks/" + deckId + "/storeResult/" + cardId
            }
            done(temp)
        }
    })
}

function flipCard(userId, deckId, done) {
    const sql = `SELECT d.id as deckId, c.id as cardId, d.name, c.question, c.answer
    FROM decks d JOIN cards c ON d.Id = c.deckId
    WHERE d.id = ? and d.active = true and d.userId = ?`
    conn.query(sql, [deckId, userId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Erro retrieving question.', err)
            let temp = {
                status: "fail",
                message: "Unable to retrieve question.",
                data: {}
            }
            done(temp)
        }
        else {
            let result = results[Math.floor(Math.random() * results.length)];
            let temp = {
                status: "success",
                message: "Your question is.",
                question: result
            }
            done(temp)
        }
    })
}
function storeResult(userId, deckId, cardId, correct, done) {
    const sql = `INSERT INTO answer_history (userId,deckId,cardId,correct)
    VALUES(?,?,?,?)`
    conn.query(sql, [userId, deckId, cardId, correct], function (err, results, field) {
        if (err || results.length === 0) {
            console.log('Error saving to answer history', err)
            let temp = {
                status: "fail",
                message: "Unable to save answer result."
            }
            done(false,temp)
        }
        else {
            temp = {
                status: "success",
                message: "Answer result saved."
            }
            done(true,temp)
        }
    })
}
module.exports = {
    startQuiz,
    showAnswer,
    storeResult,
    flipCard
}