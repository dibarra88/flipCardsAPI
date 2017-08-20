const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const config = require('config')
const authenticate = require("./middleware/authorization")
//Routes
const user = require('./routes/user')
const deck = require('./routes/deck')
const card = require('./routes/card')
const quiz = require('./routes/quiz')
const frontRoutes = require('./routes/frontRoutes')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(path.join(__dirname, 'static')))


app.use('/api', user)
app.use('/api', authenticate, deck)
app.use('/api', authenticate, card)
app.use('/api', authenticate,quiz)
app.use('/',frontRoutes)

app.listen(3000, function(){
  console.log("App running on port 3000")
})
