/*globals MileHigh */
/*jshint unused: false */
'use strict';

/*
  Main game mechanic.

  A turn happens each second.
*/

MileHigh.prototype.initialTime = (new Date()).getTime(); // game start time
MileHigh.prototype.lastTurnTime = 0;

MileHigh.prototype.nextTurn = function (timestamp) {
    var secondsSinceLastTurn = Math.floor((timestamp - this.lastTurnTime) / 1000);

    //var currentSeconds = Math.floor(timestamp / 1000),
    //turn = currentSeconds -  this.initialTimeStampInSeconds;

  if (!timestamp || this.lastTurnTime === 0 || secondsSinceLastTurn >= 1) {
    this.lastTurnTime = timestamp || 0;
    this.playTurn();
  }
};

MileHigh.prototype.playTurn = function () {
  /* GAME RULES CALLED FROM HERE */
  console.log('running logic for this turn ', this.lastTurnTime);
};
