/*globals MileHigh, requestAnimationFrame */

'use strict';

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
