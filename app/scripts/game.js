/*jshint unused: false */

'use strict';

var MileHigh = function () {

	var planeLayoutIn =
      [ '####O O O O O O O O O O O O O O O O O ',
        '####O O O O O O O O O O O O O O O O O ',
        '                                      ',
        '+#+#O O O O O O O O O O O O O O O O O ',
        '####O O O O O O O O O O O O O O O O O ',
        '+#+#O O O O O O O O O O O O O O O O O ',
        '                                      ',
        '####O O O O O O O O O O O O O O O O O ',
        '####O O O O O O O O O O O O O O O O O ' ];

  this.planeLayout = this.initPlaneLayout(planeLayoutIn);
  this.travelers = this.initRandomTravelersAtSpecificSeats(this.planeLayout);
  this.player = this.initPlayer(this.planeLayout);
  this.controls = this.initControls(this.player);
};
