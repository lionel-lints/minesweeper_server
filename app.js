const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet')


const routes = require('./routes/index');

const app = express();

/* Middleware */
app.get('env') === 'development' ? app.use(logger('dev')): '';
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*  Router */
app.use('/', routes);

/* Catch 404 and forward to error handler */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    /* if dev env show error, if not, show nothing */
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
