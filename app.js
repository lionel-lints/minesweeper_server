const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('dotenv').load();

const routes = require('./routes/index');

const app = express();

/* Middleware */
app.use(logger(app.get('env') === 'development' ? 'dev' : 'tiny'));

/*  Set security-related headers */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Set sensible security cookie defaults */
app.use(cookieParser(process.env.COOKIE_SECRET, {
  httpOnly: true,
  expires: 14 * 24 * 60 * 60 * 1000,
}));

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
    error: app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
