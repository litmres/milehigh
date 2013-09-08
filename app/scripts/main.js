/*globals MileHigh, requestAnimationFrame, World */

'use strict';

// polyfill to support Chrome, Firefox 4, Safari 6 and IE 10
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
})();

(function() {
  var board = document.getElementById('gameCanvas');
  var ctx = board.getContext('2d');

  (function setup() {
    board.width = '975';
    board.height = '225';
  })();

  var milehigh = new MileHigh();

  function tick(timestamp) {
    milehigh.beginRendering(ctx, board.width, board.height);
    milehigh.renderPlane(ctx, milehigh.world.planeLayout, board.width, board.height);
    milehigh.renderTravelers(ctx, milehigh.world.travelers, board.width, board.height);
    milehigh.renderPlayer(ctx);
    milehigh.renderHUD(ctx, milehigh.gameStats, board.width, board.height);
    milehigh.endRendering(ctx);
    milehigh.nextTurn(timestamp);
  }

  function loop(timestamp) {
    // Is Game Over?
    if (milehigh.world.currentObstacle === World.Obstacle.LANDING) {
      document.getElementById('gameover-alert').classList.remove('hide');
      // TODO: Unregister events upon game over? Or allow restart of game?
      return;
    }
    requestAnimationFrame(loop);
    tick(timestamp);
  }

  function start() {
    loop();
    /** To scroll past URL on iPhone (not needed on iPad) **/
    window.addEventListener('load', function() {
      window.scrollTo(0, 1);
    }, false);
  }

  var imgSeat = new Image();
  imgSeat.src = 'pix/seat.gif';

  var imgFloor = new Image();
  imgFloor.src = 'pix/floor.gif';

  imgSeat.onload = function() {
    window.imgSeat = imgSeat;
    window.imgFloor = imgFloor;
    start();
  };

})();
