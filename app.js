const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const session = require('express-session')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const Handlebars = require('handlebars')
const helpers = require('handlebars-helpers')()
const userRoutes = require('./routes/users')
const protectedRoutes = require('./routes/index')
const reviewRoutes = require('./routes/reviews')
const notificationRoutes = require('./routes/notifications')
const User = require('./models/User');

//load config
dotenv.config({ path: './config/config.env' })

const customHelpers = {
  ifEqual: function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
  times: function (n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  },
};

connectDB()

const app = express()

//Logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Register the 'eq' helper with Handlebars
Handlebars.registerHelper('eq', helpers.eq);
Handlebars.registerHelper('ifEqual', customHelpers.ifEqual);
// Register formatDate helper
Handlebars.registerHelper('formatDate', function (date, format) {
  const moment = require('moment');
  return moment(date).format(format);
});
Handlebars.registerHelper('times', customHelpers.times);

//Handlebars
app.engine('.hbs', exphbs.engine({
  extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
}));

app.set('layout', './views/layout');
app.set('view engine', 'hbs');


//static
app.use(express.static('public'))

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/script', express.static(__dirname + 'public/script'))
app.use('/images', express.static(__dirname + 'public/images'))


// Review routes
app.use('/api/reviews', reviewRoutes)

// User routes 
app.use('/api/user', userRoutes)

Handlebars.registerHelper('eq', function (a, b) {
  b = parseInt(b)
  return (a === b);
});
Handlebars.registerHelper('gt', function (a, b) {
  b = parseInt(b)
  return (a > b);
});
Handlebars.registerHelper('gte', function (a, b) {
  b = parseInt(b)
  return (a >= b);
});
Handlebars.registerHelper('lt', function (a, b) {
  b = parseInt(b)
  return (a < b);
});
Handlebars.registerHelper('lte', function (a, b) {
  b = parseInt(b)
  return (a <= b);
});
Handlebars.registerHelper('ne', function (a, b) {
  b = parseInt(b)
  return (a !== b);
});

Handlebars.registerHelper('lengthGT', function (a, b) {
  return (a.length > b);
});

Handlebars.registerHelper('substring', function (a) {
  return a.slice(0, 200);
});

//Routes
app.use('/', protectedRoutes)

// Notification routes
app.use('/api/notification', notificationRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))