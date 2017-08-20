const conn = require('../lib/db');

function getCard(cardId,userId, done){
    const sql = `SELECT question, answer FROM cards WHERE id = ? AND userId = ? AND active = true`
    const data = {
        status: "",
        message: ""
    }
    conn.query(sql, [cardId, userId], function (err, results, fields) {
        if (err || results.length === 0) {
            console.log('Error retriving card card', err)
            data.status = "fail";
            data.message = "Unable to retrieve card";
            done(false,data)
        } else {
            data.status = "success";
            data.message = "Retrieved deck."
            data.card = results;
            done(true,data);
        }
    })
}
function updateCard(cardId,question,answer, done){
    const sql = `UPDATE cards SET question = ?, answer = ? WHERE id = ?`
    const temp = {
        status: "",
        message:""
    }
    conn.query(sql,[question, answer,cardId], function(err,results,field){
        if(err){
            console.log('Error unable to update card.', err)
            temp.status = "fail";
            temp.message = "Unable to update card."
            done(temp)
        }
        else{
            temp.status = "success";
            temp.message = "Success updating card.";
            done(temp)
        }
    })
}

function createCard(deckId,userId,question,answer,done){
    const sql = `INSERT INTO cards (deckId,userId,question,answer)
    VALUES (?,?,?,?)`
    const temp = {};
    conn.query(sql,[deckId,userId,question,answer],function(err, result, fields){
        if(err){
            console.log('Error unable to create card.', err)
            temp.status = "fail";
            temp.message = "Unable to create card."
            done(false,temp)
        }
        else{
            temp.status = "success";
            temp.message = "Success creating new card.";
            done(true,temp)
        }
    })

}

function deleteCard(cardId, userId, done){
    const sql = `UPDATE cards
     SET active = false
     WHERE id = ? and userId = ?`

    conn.query(sql,[cardId,userId],function(err, results    , fields){
        if(err || results.changedRows === 0){
            console.log('Error deleting card', err);
            let temp = {
                status: "fail",
                message: "Unable to delete card."
            }
            done(false,temp);
        }
        else{
            let temp = {
                status:"success",
                message:"Card deleted."
            }
            done(true,temp);
        }
    })
}
module.exports = {
    getCard,
    createCard,
    updateCard,
    deleteCard
}