const express = require('express')
const router = express.Router()
const Deck = require('../models/deck')

/**
 * Gets all active user's decks
 */
router.get('/decks', function (req, res, next) {
    const userId = res.locals.userId;
    Deck.getAllDecks(userId, function (success,response) {
        if (!success) {
            res.status(404).json(response)
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Gets all active user's decks with it's respective active cards
 */
router.get('/decks/all', function (req, res, next) {
    const userId = res.locals.userId;
    Deck.getAllDecksWithCards(userId, function (success, response) {
        if (!success) {
            res.status(404).json(response)
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Gets active deck by deck id
 */
router.get('/decks/:id', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.id;
    Deck.getDeckInfo(deckId, userId, function (success,response) {
        if (!success) {
            res.status(404).json(response)
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Creates a deck
 */
router.post('/decks', function (req, res, next) {
    const name = req.body.name;
    const userId = res.locals.userId;
    if (name.length === 0) {
        let response = {
            status: "fail",
            message: "Name can't be empty.",
        }
        res.status(304).json(response);
    }
    Deck.createDeck(userId, name, function (success,response) {
        if (!success) {
            res.status(304).json(response);
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Updates active deck by given deck id
 */
router.put('/decks/:id', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.id;
    const name = req.body.name;
    if (name.length === 0) {
        let response = {
            status: "fail",
            message: "Name can't be empty.",
        }
        res.status(304).json(response);
    }
    Deck.updateDeck(deckId, userId, name, function (success,response) {
        if (!success) {
            res.status(304).json(response);
        }
        else {
            res.json(response);
        }
    })
})
/**
 * Sets deck active value to false
 */
router.delete('/decks/:id', function (req, res, next) {
    const userId = res.locals.userId;
    const deckId = req.params.id;
    Deck.deleteDeck(deckId, userId, function (success,response) {
        if (!success) {
            res.status(304).json(response)
        }
        else {
            res.json(response);
        }
    })
})

module.exports = router