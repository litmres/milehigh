/*globals MileHigh,World */
/*jshint unused: false */
'use strict';

/**
 * Some game settings that could go somewhere one day
 */
MileHigh.ATTENDANT_COLOR = '#0000ff';
MileHigh.CART_COLOR = '#fff';

MileHigh.prototype.renderCrew = function (ctx, boardWidth, boardHeight) {

  this.world.attendants.forEach(function (a) {
    // only render when attendant is in an aisle
    if (a.inSeat) {
      return;
    }
    var row = a.y, col = a.x, cartX = a.direction === 'r' ? 1 : -1;

    // render crew and cart
    MileHigh.renderSimpleSquare(ctx, row, col, MileHigh.ATTENDANT_COLOR);

    if (a.hasCart) {
      MileHigh.renderSimpleSquare(ctx, row, col + cartX * 1, MileHigh.CART_COLOR);
      MileHigh.renderSimpleSquare(ctx, row, col + cartX * 2, MileHigh.CART_COLOR);
    }
  });
};
