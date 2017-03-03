#!/usr/bin/env node/
"use strict";
/**
 * Module dependencies.
 */

let app = require('./app.js');
let debug = require('debug')('Api:server');
let https = require('https');
let http = require('http');
let fs = require('fs');
let config = require('./helpers/configStub')('main');
debug('Starting express...');

/**
 * Get port from environment and store in Express.
 */
debug('ENV port: ' + process.env.port);
let port = normalizePort(process.env.PORT || '1337');
app.set('port', port);
debug('Used port: ' + port);

/**
 * Create HTTPs server.
 */

let useHttps = config.server.useHttps;
let server = null;
let redirector = null;
debug('useHttps: ' + useHttps);
if (useHttps === true) {
  debug('Using https.');
  debug('Creating http server.');
  redirector = http.createServer(function (req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers.host + req.url});
    res.end();
  }).listen(80);
  debug('Http server created for redirection.');
  console.log('Redirecting http traffic to https!');

  debug('Creating https server.');
  server = https.createServer({
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt')
  }, app);
  debug('Https server created.');

} else {
  debug('Not using https.');
  debug('Creating http server.');
  server = http.createServer(app);
  debug('Http server created.');
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      throw new Error(bind + ' requires elevated privileges');
    case 'EADDRINUSE':
      throw new Error(bind + ' is already in use');
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}