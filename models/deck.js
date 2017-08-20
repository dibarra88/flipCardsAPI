const conn = require('../lib/db');

function getAllDecks(userId, done) {
    const sql = `SELECT * 
    FROM decks
    WHERE userId = ? and active = true`

    conn.query(sql, [userId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Error retrieving card decks', err)
            data = {
                status: "fail",
                message: "Unable to retrieve card decks.",
                decks: ""
            }
            done(false,data)
        } else {
            data = {
                status: "success",
                message: "Current card decks",
                decks: results
            }
            done(true,data)
        }
    })
}
function createDeck(userId, name, done) {
    const sql = `INSERT INTO decks (userId, name) VALUES (?,?)`;
    const data = {
        status: "",
        message: "",
        deck: {
            name: name,
            id: ""
        }
    }
    conn.query(sql, [userId, name], function (err, results, fields) {
        if (err) {
            console.log('Error creating new deck', err);
            data.status = "fail";
            data.message = "Error creating new deck";
            done(false,data)
        } else {
            data.status = "success",
                data.message = "New deck created.",
                data.deck.id = results.insertId;
            done(true,data)
        }
    })
}

function getDeckInfo(deckId, userId, done) {
    const sql = `SELECT name, active FROM decks WHERE id = ? AND userId = ? AND active = true`
    const data = {
        status: "",
        message: ""
    }
    conn.query(sql, [deckId, userId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Error retriving card deck', err)
            data.status = "fail";
            data.message = "Unable to retrieve deck";
            done(false,data)
        } else {
            data.status = "success";
            data.message = "Retrieved deck."
            data.deck = results;
            done(true,data);
        }
    })
}
function updateDeck(deckId, userid, name, done) {
    const sql = `UPDATE decks SET name = ? WHERE id = ? and userId = ?`
    conn.query(sql, [name, deckId, userid], function (err, results, fields) {
        if (err || results.changedRows === 0) {
            console.log('Error updating deck', err)
            let response = {
                status: "fail",
                message: "Unable to update deck."
            }
            done(false,response)
        }
        else {
            let response = {
                status: "success",
                message: "Card deck updated."
            }
            done(true,response);
        }
    })
}
function deleteDeck(deckId, userid, done) {
    const sql = `UPDATE decks d JOIN cards c ON d.id = c.deckId 
    SET d.active = FALSE,c.active = FALSE
    WHERE d.id = ? AND d.userid = ?`
    conn.query(sql, [deckId, userid], function (err, results, fields) {
        if (err || results.changedRows === 0) {
            console.log('Error deleting deck', err);
            let temp = {
                status: "fail",
                message: "Unable to delete deck."
            }
            done(false,temp);
        }
        else {
            let temp = {
                status: "success",
                message: "Deck deleted."
            }
            done(true,temp);
        }
    })
}


function getAllDecksWithCards(userId, done) {
    const sql = `SELECT d.id as deckId, c.id as cardId, d.name, c.question, c.answer
    FROM decks d
    LEFT OUTER JOIN (SELECT * FROM cards WHERE active = true) c on d.id = c.deckId
    WHERE d.userid = ? AND d.active = true `
    conn.query(sql, [userId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Error retrieving decks', err)
            data = {
                status: "fail",
                message: "Unable to retrieve card decks.",
                decks: ""
            }
            done(false,data)
        } else {
            let data = {
                status: "success",
                message: "Current decks.",
                decks: []
            }
            let currentDeck = "";
            let t;
            results.forEach(function (e, index) {
                if (currentDeck !== e.deckId) {
                    if (index !== 0) {
                        data.decks.push(t);
                    }
                    t = {
                        deck: {
                            name: e.name,
                            id: e.deckId
                        },
                        cards: [{
                            id: e.cardId,
                            question: e.question,
                            answer: e.answer
                        }]
                    }
                    currentDeck = e.deckId;
                } else {
                    t.cards.push({
                        id: e.cardId,
                        question: e.question,
                        answer: e.answer
                    })
                }
                if (index === results.length - 1) {
                    data.decks.push(t)
                }
            })
            done(true,data)
        }
    })

}
module.exports = {
    createDeck,
    getAllDecks,
    getDeckInfo,
    updateDeck,
    deleteDeck,
    getAllDecksWithCards
}