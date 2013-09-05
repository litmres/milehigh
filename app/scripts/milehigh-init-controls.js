/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.initControls = function (player) {
  var world = this.world;
  addEventListener('keydown', function(e) {
    var playerMove = new CustomEvent('playerMove', {'audio': 'playerMove'});
    window.dispatchEvent(playerMove);
    if (e.keyCode === 37) {
      if (world.canIMoveLeft()) {
        player.x--;
      }
    } else if (e.keyCode === 38) {
      if (world.canIMoveUp()) {
        player.y--;
      }
    } else if (e.keyCode === 39) {
      if (world.canIMoveRight()) {
        player.x++;
      }
    } else if (e.keyCode === 40) {
      if (world.canIMoveDown()) {
        player.y++;
      }
    }
  }, false);
};

