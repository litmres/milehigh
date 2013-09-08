/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.initControls = function (player, board) {
  var world = this.world;
  function move(direction) {
    var playerMove = new CustomEvent('audio', {detail: 'playerMove'});
    window.dispatchEvent(playerMove);
    if (direction === 'left') {
      if (world.canIMoveLeft()) {
        player.x--;
      }
    } else if (direction === 'right') {
      if (world.canIMoveRight()) {
        player.x++;
      }
    } else if (direction === 'up') {
      if (world.canIMoveUp()) {
        player.y--;
      }
    } else if (direction === 'down') {
      if (world.canIMoveDown()) {
        player.y++;
      }
    }
  }

  function pickDirection(e) {
    if (e.keyCode === 37) {
      return 'left';
    } else if (e.keyCode === 38) {
      return 'up';
    } else if (e.keyCode === 39) {
      return 'right';
    } else if (e.keyCode === 40) {
      return 'down';
      /* Doesn't work well, but at least is kinda playable on mobile Safari, now */
    } else if (e.clientX && e.clientY) {
      if (e.clientX < (board.offsetWidth * 0.2)) {
        return 'left';
      } else if (e.clientX > (board.offsetWidth * 0.8)) {
        return 'right';
      } else if (e.clientY < (board.offsetHeight * 0.3)) {
        return 'up';
      } else if (e.clientY > (board.offsetHeight * 0.8)) {
        return 'down';
      }
    }
  }

  board.addEventListener('click',function(e) {
    move(pickDirection(e));
  }, false);

  window.addEventListener('keydown', function(e) {
    move(pickDirection(e));
  }, false);
};

