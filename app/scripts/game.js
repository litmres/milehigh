/*jshint unused: false */

'use strict';

var MileHigh = function () {

  var TOTAL_TRAVELERS = 20;

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
  this.initRandomTravelersAtSpecificSeats(
    { planeLayout: this.planeLayout,
      totalTravelers: TOTAL_TRAVELERS }
  );
  this.player = this.initPlayer(this.planeLayout);
};
