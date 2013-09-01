/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.renderTravelers = function (ctx, boardWidth, boardHeight) {

  var PIECE_SIZE = 25;    // 20 pixels high and wide

  function renderSimpleSquare (row, col, fillStyle) {
    var y = row * PIECE_SIZE,
      x = col * PIECE_SIZE;

    // padding
    y += 1;
    x += 1;
    var width = PIECE_SIZE - 2,
      height = PIECE_SIZE - 2;

    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
  }

  function renderTraveler (row, col) {
    renderSimpleSquare(row, col, '#008');
  }

  var travelers = this.world.travelers;

  for (var t = 0; t < travelers.length; t++) {
    renderTraveler(travelers[t].row, travelers[t].col);
  }
};
