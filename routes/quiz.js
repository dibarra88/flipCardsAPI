const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')

/**
 * Get random active card with only the question part 
 */
router.get('/decks/:id/startQuiz', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.id;
    Quiz.startQuiz(userId, deckId, function (response) {
        res.json(response);
    })
})
/**
 * Get answer by deck Id and card Id
 */
router.get('/decks/:deckId/answer/:cardId', function (req, res, next) {
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;
    Quiz.showAnswer(deckId, cardId, function (response) {
        res.json(response);
    })
})
/**
 * Get random active card with both question and answer 
 */
router.get('/decks/:id/flipCard', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.id;
    Quiz.flipCard(userId, deckId, function (response) {
        res.json(response);
    })
})
/**
 * Save user input if they got the question right (true/false)
 */
router.post('/decks/:deckId/storeResult/:cardId', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;
    const correct = req.body.correct;
    if(correct.length === 0){
        let response = {
            status: "fail",
            message: "please input correct or incorrect value.",
        }
        res.status(304).json(response);
    }
    Quiz.storeResult(userId, deckId, cardId, correct, function (success,response) {
        if (!success) {
            res.status(304).json(response)
        }
        else {
            res.json(response);
        }
    })
})
module.exports = router
