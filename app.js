require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var cors = require('cors');
mongoose.connect(process.env.DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true});

const { config, engine } = require('express-edge');
// Configure Edge if need to
config({ cache: process.env.NODE_ENV === 'production' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', path.join(__dirname, 'views'));

// Sessions
app.use(session({
  secret: 'verysecret',
  resave: false,
  saveUninitialized: true
}));

// Flash Messages
app.use(flash());


app.use(csrf());

app.use(logger('tiny'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set Locals
app.use(function(req, res, next){
  res.locals.error_messages = req.flash('error_messages');
  res.locals.success_message = req.flash('success_message');
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
