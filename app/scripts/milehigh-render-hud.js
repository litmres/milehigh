/*globals MileHigh */

'use strict';

// HUD view renderer
// Called on every turn.  should update all play stats for the user.  
// We should include a debug mode as well
MileHigh.prototype.renderHUD = function (ctx, stats, boardWidth, boardHeight) {
  var HUD_HEIGHT = 100,
      y = boardHeight - HUD_HEIGHT;

  ctx.fillStyle = '#020';
  ctx.fillRect(0, y - 20, boardWidth, boardHeight);
  ctx.font = '15pt Arial';
  this.renderText(ctx, "Turn " + stats.turns, 5, y + 1);
};

MileHigh.prototype.renderText = function (ctx, text, x, y) {
  ctx.textAlign = 'left';
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y); 
};
