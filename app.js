const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
require('dotenv').config()

const uol = require('./routes/uol.js')
const r7 = require('./routes/r7.js')
const cnn = require('./routes/cnn.js')

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyparser.json())
app.use('/uol', uol)
app.use('/r7', r7)
app.use('/cnn', cnn)

app.get('/', (req, res) =>{
    res.render('home/home')
})

app.listen(80, () =>{
    console.log(`Servidor Iniciado: http://localhost:80`)
})