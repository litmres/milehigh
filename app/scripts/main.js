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

  function tick() {
    milehigh.renderPlane(ctx, milehigh.world.planeLayout, board.width, board.height);
    milehigh.renderTravelers(ctx, milehigh.world.travelers, board.width, board.height);
    milehigh.renderPlayer(ctx);
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
