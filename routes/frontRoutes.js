const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next){
    res.render("index",{appType:'hi'})
})
router.get('/decks', function(req, res, next){
    res.render('decks')
})
router.get('/decks/:id', function(req,res,next){
    const deckId = req.params.id;
    res.render('cards',{deckId:deckId})
})
router.get('/editDeck/:id', function(req, res, next){
    const deckId = req.params.id;
    res.render('editDeck', {deckId:deckId})
})
router.get('/editCard/:id', function(req,res, next){
    const cardId = req.params.id;
    res.render('editCard', {cardId:cardId})
})
router.get('/addDeck',function(req, res, next){
    const deckId = req.params.deckId;
    res.render('addDeck')
})
router.get('/addCard/:id', function(req,res,next){
    const deckId = req.params.id;
    res.render('addCard',{deckId:deckId})
})
router.get('/quiz/:id/', function(req, res,next){
    const deckId = req.params.id;
    res.render('quiz',{deckId:deckId})
})
module.exports = router