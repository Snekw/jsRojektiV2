"use strict";
module.exports = {
  server: {
    useHttps: false,
    CORS: 'http://localhost:1337'
  },

  db: {
    connectionString: 'mongodb://localhost/jsRojekti2',
    author: 'Snekw',
    enabled: true
  }
};