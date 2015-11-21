'use strict';

var WS = require('ws');
var ws = new WS('ws://localhost:8080');

ws.on('open', function onOpen() {
  ws.send('3');
  ws.send('2');
  ws.send('-');

  ws.on('message', function(message) {
    console.log(message);
  });
});

setTimeout(function() { ws.close(); }, 1000);
