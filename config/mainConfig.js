"use strict";
module.exports = {
  server:{
    useHttps: false,
    CORS: 'http://localhost:1337'
  },
  
  db:{
    connectionString: 'mongodb://localhost/jsRojektiV2',
    enabled: true
  }
};