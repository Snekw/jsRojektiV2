/**
 * Copyright (c) 2017 Ilkka Kuosmanen
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
"use strict";
let debug = require('debug')('Auth:routes'),
  express = require('express'),
  models = require('../db/models'),
  config = require('../helpers/configStub')('main'),
  router = express.Router();


// router.get('/test', function (req, res, next) {
//   //TEMP!
//   let n = new models.function({
//     author: 'Snekw',
//     name: 'Test',
//     inputs: [
//       {
//         name: 'S',
//         unit: 'D'
//       }
//     ],
//     group: 'Test',
//     retUnit: 'T',
//     function: 'console.log(\'test\');'
//   });
//   n.save();
//   res.status(200).json({message: 'Heelo'});
// });

router.get('/funcs', function (req, res, next) {
  models.function.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        message: 'Error'
      });
      throw err;
    }

    //Strip data that we don't want to send to user
    let retUsers = [];
    for (let i = 0; i < users.length; i++) {
      retUsers[i] = {};
      for (let key  in users[i]._doc) {
        if (users[i]._doc.hasOwnProperty(key)) {
          let add = true;
          switch (key) {
            case '_id':
            case '__v':
            case 'author':
              add = false;
              break;
          }
          if (add)
            retUsers[i][key] = users[i]._doc[key];
        }
      }
    }
    return res.status(200).json({data: retUsers});
  });
});

router.post('/addFunc', function (req, res, next) {
  if (req.body.author != config.db.author) {
    res.status(400).json({message: 'Bad request'});
    return;
  }
  if (req.body.name && req.body.author && req.body.group && req.body.function && req.body.retUnit) {
    models.function.find({name: req.body.name}, (err, func) => {
      if (err || func) {
        res.status(400).json({message: 'Bad request'});
        return;
      }

      let newFunc = new models.function();
      newFunc.name = req.body.name;
      newFunc.author = req.body.author;
      newFunc.group = req.body.group;
      newFunc.function = req.body.function;
      newFunc.retUnit = req.body.retUnit;
      newFunc.inputs = req.body.inputs;

      newFunc.save((err) => {
        if (err)
          throw err;

        res.status(200).json({message: 'Success'});
      })
    });
  } else {
    res.status(400).json({message: 'Bad request'});
  }
});

module.exports = router;