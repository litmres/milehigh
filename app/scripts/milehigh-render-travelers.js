/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.renderTravelers = function (ctx, boardWidth, boardHeight) {

  var PIECE_SIZE = 25;    // pixels high and wide

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

  function renderTraveler (row, col, heat) {
    renderSimpleSquare(row, col, '#008');

    // Show heat level if paired
    if (heat > 0) {
      ctx.font = '10pt Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(heat + '', col * PIECE_SIZE + PIECE_SIZE / 2 + 1, row * PIECE_SIZE + PIECE_SIZE / 2 + 6);
    }
  }

  var travelers = this.world.travelers;

  for (var t = 0; t < travelers.length; t++) {
    if (!travelers[t].paired) {
      renderTraveler(travelers[t].y, travelers[t].x, travelers[t].heat);
    }
  }
};
