/**
 * Created by Ilkka on 8.4.2016.
 */
"use strict";
let express = require('express');
let debug = require('debug')('Api:app');
let path = require('path');
// let logger = require('morgan');
let bodyParser = require('body-parser');
let config = require('../helpers/configStub')('main');
// let common = require('../lib/common');

debug('Initialize express');
let app = express();
debug('Express initialized');

//Setup db
// debug('Start setup db');
// require('../db/setup');
// debug('db setup finished');


//Enable bodyparser
debug('Enabling bodyParser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Logger
// app.use(logger('dev'));

//Default headers
// debug('Access-Control-Allow-Origin: ' + config.server.CORS);
app.use(function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', config.server.CORS);
  // res.header('Access-Control-Allow-Headers', ['authentication', 'content-type']);
  // res.header('Access-Control-Allow-Methods', ['PUT', 'DELETE']);
  next();
});

app.use(express.static('www'));

//Api route lets
// debug('Adding routes');
// let auth = require('../api/auth/routes.js');

//Api routes
// app.use('/auth', auth);
// debug('Adding routes finished');

//Catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handlers
/* istanbul ignore next */
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    success: false, message: err.message, error: {
      status: err.status,
      stack: err.stack
    }
  });
});

module.exports = app;