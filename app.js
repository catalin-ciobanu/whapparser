var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';

var expensesRouter = require('./routes/expenses');
var reportsRouter = require('./routes/reports');
var dashboardRouter = require('./routes/dashboard');
var monthlyViewRouter = require('./routes/monthlyView');

var app = express();


app.use(fileUpload());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', expensesRouter);
app.use('/expenses', expensesRouter); // Add catalog routes to middleware chain.
app.use('/dashboard', dashboardRouter); // Add catalog routes to middleware chain.
app.use('/reports', reportsRouter); // Add catalog routes to middleware chain.
app.use('/monthlyView', monthlyViewRouter); // Add catalog routes to middleware chain.



mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
