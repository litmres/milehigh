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

  var milehigh = new MileHigh();

  function tick(timestamp) {
    milehigh.renderPlane(ctx, milehigh.world.planeLayout, board.width, board.height);
    milehigh.renderTravelers(ctx, milehigh.world.travelers, board.width, board.height);
    milehigh.renderPlayer(ctx);
    milehigh.nextTurn(timestamp);
  }

  function loop(timestamp) {
    requestAnimationFrame(loop);
    tick(timestamp);
  }

  function start() {
    loop();
  }
  start();
})();
