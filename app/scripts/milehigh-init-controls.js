/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.initControls = function (player) {

  var world = this.world;
  var touchEvent = {};

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

  function touchStart(e) {
    event.preventDefault();
    if (e.touches.length === 1) {
      touchEvent.startX = e.touches[0].pageX;
      touchEvent.startY = e.touches[0].pageY;
    }
  }

  function touchMove(e) {
    e.preventDefault();
    touchEvent.stopX = e.touches[0].pageX;
    touchEvent.stopY = e.touches[0].pageY;
  }

  function touchEnd(e) {
    e.preventDefault();
    if (touchEvent.startY > touchEvent.stopY + 100) {
      move('up');
    } else if (touchEvent.startY < touchEvent.stopY - 75) {
      move('down');
    } else if (touchEvent.startX > touchEvent.stopX - 75) {
      move('left');
    } else if (touchEvent.startX < touchEvent.stopX + 75) {
      move('right');
    }
  }

  function keyDown(e) {
    if (e.keyCode === 37) {
      move('left');
    } else if (e.keyCode === 38) {
      move('up');
    } else if (e.keyCode === 39) {
      move('right');
    } else if (e.keyCode === 40) {
      move('down');
    }
  }

  window.addEventListener('keydown', keyDown, false);
  window.addEventListener('touchstart', touchStart, false);
  window.addEventListener('touchmove', touchMove, false);
  window.addEventListener('touchend', touchEnd, false);
};

