/*globals MileHigh, requestAnimationFrame */

'use strict';

// polyfill to support Chrome, Firefox 4, Safari 6 and IE 10
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
  var board = document.createElement('canvas'),
  ctx = board.getContext('2d');

  (function setup() {
    board.width = '980';
    board.height = '400';
    document.body.appendChild(board);
  })();

  var game = new MileHigh();

  function tick() {
    game.renderPlane(ctx, board.width, board.height);
    game.renderTravelers(ctx, board.width, board.height);
  }

  function loop() {
    requestAnimationFrame(loop);
    tick();
  }

  function start() {
    loop();
  }
  start();
})();
