var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

/* --- V7: Using dotenv     --- */
require('dotenv').load();

/* --- FOR CARPOOLING     --- */
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var signup_passengerRouter = require('./routes/signup_passenger');
var signup_driverRouter = require('./routes/signup_driver');
var navbarRouter = require('./routes/navbar');
var filter_ridesRouter = require('./routes/filter_rides');
var myRidesDriversRouter = require('./routes/myRides_drivers')
var bidsRouter = require('./routes/bids');
var create_rideRouter = require('./routes/create_rides');
var update_ridesRourter = require('./routes/update_rides');
/* ---------------------------- */

/* --- FROM TEMPLATE --- */
var tableRouter = require('./routes/table');
var loopsRouter = require('./routes/loops');
var selectRouter = require('./routes/select');
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
app.use(flash());

app.use(session({
  key: 'username',
  secret: 'sjfoeijfelf',
  resave: false,
  saveUninitialized: false,
  cookie: {expires: 300000}
}));

/* --- FOR CARPOOLING    --- */
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/navbar', navbarRouter);
app.use('/myRides_drivers', myRidesDriversRouter)
app.use('/bids', bidsRouter);
/* ---------------------------- */

/* --- FROM TEMPLATE --- */
app.use('/table', tableRouter);
app.use('/loops', loopsRouter);
app.use('/select', selectRouter);
/* ---------------------------- */

/* --- Modify Database  --- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* --- FOR CARPOOLING    --- */
app.use('/signup_passenger', signup_passengerRouter);
app.use('/signup_driver', signup_driverRouter);
app.use('/filter_rides', filter_ridesRouter);
app.use('/create_rides', create_rideRouter);
app.use('/update_rides', update_ridesRourter);
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
