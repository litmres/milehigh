/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.renderPlane = function (ctx, planeLayout, boardWidth, boardHeight) {

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

  function renderSeat (row, col) {
    renderSimpleSquare(row, col, '#080');
  }

  function renderLavatory (row, col) {
    renderSimpleSquare(row, col, '#0D0');
  }

  function renderWall (row, col) {
    renderSimpleSquare(row, col, '#888');
  }

  function renderIsle (row, col) {
    renderSimpleSquare(row, col, '#000');
  }

  ctx.clearRect(0, 0, boardWidth, boardHeight);

  for (var row = 0; row < planeLayout.length; row++) {
    for (var col = 0; col < planeLayout[0].length; col++) {
      switch (planeLayout[row][col]) {
      case 'O':
        renderSeat(row, col);
        break;
      case ' ':
        renderIsle(row, col);
        break;
      case '+':
        renderLavatory(row, col);
        break;
      default:
        renderWall(row, col);
        break;
      }
    }
  }
};
