/*jshint unused: false */

'use strict';

var MileHigh = function () {
  this.planeLayout = this.initPlaneLayout();
  this.travelers = this.initRandomTravelersAtSpecificSeats(this.planeLayout);
  this.player = this.initPlayer(this.planeLayout);
};
