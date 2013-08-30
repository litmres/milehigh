/*globals MileHigh */
/*jshint unused: false */
'use strict';

/*
	Generate random travelers.
*/
MileHigh.prototype.initRandomTravelersAtSpecificSeats = function (params) {

	var planeLayout = params.planeLayout,
		totalTravelers = params.totalTravelers;

  this.travelers = [];

  for (var traveler=0; traveler < totalTravelers; traveler++) {
    this.travelers.push(planeLayout.findRandomSeat());
  }
};
