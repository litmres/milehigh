/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.renderPlayer = function renderPlayer(ctx) {
  ctx.fillStyle = '#a0a';
  ctx.fillRect((this.player.x*25)+1, (this.player.y*25)+1, this.player.width, this.player.height);
};