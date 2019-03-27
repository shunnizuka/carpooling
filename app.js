var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* --- V7: Using dotenv     --- */
require('dotenv').load();

/* --- FOR CARPOOLING     --- */
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
/* ---------------------------- */

/* --- FROM TEMPLATE --- */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var tableRouter = require('./routes/table');
var loopsRouter = require('./routes/loops');
var selectRouter = require('./routes/select');
var insertRouter = require('./routes/insert');
/* ---------------------------- */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* --- FOR CARPOOLING    --- */
app.use('/login', loginRouter);
/* ---------------------------- */

/* --- FROM TEMPLATE --- */
app.use('/about', aboutRouter);
app.use('/table', tableRouter);
app.use('/loops', loopsRouter);
app.use('/select', selectRouter);
/* ---------------------------- */

/* --- Modify Database  --- */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* --- FOR CARPOOLING    --- */
app.use('/signup', signupRouter);
/* ---------------------------- */

/* --- FROM TEMPLATE    --- */
app.use('/insert', insertRouter);
/* ---------------------------- */

/* ---------------------------- */

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
