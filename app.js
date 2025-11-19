const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

 const indexRouter = require('./routes/index');
 const usersRouter = require('./routes/users');
 const weatherRouter = require('./routes/weather');

 const categoriesRoutes = require('./routes/categories');
 const inventoriesRoutes = require('./routes/inventories');
 const productsRoutes = require('./routes/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use('/portfolio', express.static(path.join(__dirname, 'public/portfolio')));

 app.use('/', indexRouter);
app.use('/users', usersRouter);
 app.use('/weather', weatherRouter);
 app.use("/categories", categoriesRoutes);
 app.use("/inventories", inventoriesRoutes);
 app.use("/products", productsRoutes);

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
