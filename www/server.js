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
function getFuncs() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = checkFuncReceived;
  xhr.open('GET', 'funcs');
  xhr.send();
}

function checkFuncReceived(e) {
  if (e.target.readyState == 4 && e.target.status == 200) {
    funcsReceived(e);
  }
}

function funcsReceived(e) {
  var data = JSON.parse(e.target.response).data;
  for (var i = 0; i < data.length; i++) {
    data[i].func = Function('inputs', data[i].function);
  }
  console.log(data);
  setupFuncs(data);
}

function addFunc(data) {
  if (!data.name && !data.group && !data.inputs && !data.retUnit && !data.function) {
    return;
  }

  var xhr = new XMLHttpRequest();
  var l = data;
  xhr.onreadystatechange = function (e) {
    if (e.target.readyState == 4) {
      if (e.target.status == 200) {
        data.func = Function('inputs', data.function);
        funcs.push(data);
        setupFuncs(funcs);
      } else {
        console.log('Failed');
      }
    }
  };
  xhr.open('POST', 'addFunc');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}