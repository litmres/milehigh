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
    game.renderPlane(ctx, game.planeLayout, board.width, board.height);
    game.renderTravelers(ctx, game.travelers, board.width, board.height);
    game.renderPlayer(ctx, game.planeLayout);
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
