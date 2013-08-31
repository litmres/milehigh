/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.initControls = function (player) {
  addEventListener('keydown', function(e) {
    if (e.keyCode === 37) {
      player.x--;
    } else if (e.keyCode === 38) {
      player.y--;
    } else if (e.keyCode === 39) {
      player.x++;
    } else if (e.keyCode === 40) {
      player.y++;
    }
  }, false);
};
