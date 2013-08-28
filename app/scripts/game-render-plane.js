/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.renderPlane = function (ctx, planeLayout, boardWidth, boardHeight) {

  function renderSeat() {
    ctx.fillRect(Math.floor(Math.random() * 880), (Math.random() * 380),20,20);
  }

  function makeEmptySeat() {
    ctx.fillStyle='#0F0';
  }

  function makeFullSeat() {
    ctx.fillStyle='#080';
  }

  function makeRandomSeat() {
    if (Math.floor(Math.random() * 2)) {
      makeFullSeat();
    } else {
      makeEmptySeat();
    }
    renderSeat();
  }

  ctx.clearRect(0, 0, boardWidth, boardHeight);
  var seatsToDraw = 100;
  while (seatsToDraw) {
    makeRandomSeat();
    seatsToDraw--;
  }

};
