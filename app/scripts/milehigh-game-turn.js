/*globals MileHigh */
/*jshint unused: false */
'use strict';

/*
  Main game mechanic.

  A turn happens each second.
*/

MileHigh.prototype.initialDate = new Date();
MileHigh.prototype.turn = 0;

MileHigh.prototype.nextTurn = function (currentDate) {
  var initialTimeStampInSeconds = Math.floor(this.initialDate.getTime() / 1000),
    currentSeconds = Math.floor(currentDate.getTime() / 1000),
    turn = currentSeconds -  initialTimeStampInSeconds;

  if (turn !== this.turn) {
    this.turn = turn;
    this.playTurn();
  }
};

MileHigh.prototype.playTurn = function () {
  /* GAME RULES CALLED FROM HERE */
  console.log('running logic for this turn ', this.turn);
};
