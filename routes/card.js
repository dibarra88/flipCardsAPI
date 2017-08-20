const express = require('express')
const router = express.Router()
const Card = require('../models/card')

/**
 * Get card by card Id
 */
router.get('/decks/card/:id', function(req,res,next){
    const cardId = req.params.id;
    const userId = res.locals.userId;
    Card.getCard(cardId, userId, function(success, response){
        if (!success) {
            res.status(304).json(response)
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Update card by id
 */
router.put('/decks/card/:id', function (req, res, next) {
    const cardId = req.params.id;
    const question = req.body.question;
    const answer = req.body.answer;
    if (question.length === 0 || answer.length === 0) {
        let response = {
            status: "fail",
            message: "Question and Answer can't be empty.",
        }
        res.status(304).json(response);
    }
    Card.updateCard(cardId, question, answer, function (success,response) {
        if (!success) {
            res.status(304).json(response);
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Create new card by deck id
 */
router.post('/decks/:id/card', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.id;
    const question = req.body.question;
    const answer = req.body.answer;
    if (question.length === 0 || answer.length === 0) {
        let response = {
            status: "fail",
            message: "Question and Answer can't be empty.",
        }
        res.status(304).json(response);
    }
    Card.createCard(deckId, userId, question, answer, function (success,response) {
        if (!success) {
            res.status(304).json(response);
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Set card active field to false
 */
router.delete('/decks/card/:id', function (req, res, next) {
    const userId = res.locals.userId;
    const cardId = req.params.id;
    Card.deleteCard(cardId, userId, function (success,response) {
        if (!success) {
            res.status(304).json(response)
        }
        else {
            res.json(response);
        }
    })
})

module.exports = router