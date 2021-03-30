const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const homeController = require('./Controllers/homeController')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/agendamento', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

const indexRouter = require('./Routes/indexRouter')

setInterval(() => {
    homeController.sendEmail()
}, 1000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("Public"))
app.set('view engine', 'ejs')
app.set('views', './Views')

app.use('/', indexRouter)

app.listen(3000)