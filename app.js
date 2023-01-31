const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

//load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

//Logging
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/"}));
app.set('layout', './views/layout');
app.set('view engine', 'hbs');

//Routes
app.use('/', require('./routes/index'))

//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//static
app.use(express.static('public'))

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/script', express.static(__dirname + 'public/script'))
app.use('/images', express.static(__dirname + 'public/images'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))