/*globals MileHigh */
/*jshint unused: false */
'use strict';

/*
	Generate random travelers.
*/
MileHigh.prototype.initRandomTravelersAtSpecificSeats = function (params) {

  var planeLayout = params.planeLayout,
    totalTravelers = params.totalTravelers,
    seatTaken,
    seatToTry;

  this.travelers = [];

  for (var traveler=0; traveler < totalTravelers; traveler++) {
    seatTaken = true;
    while (seatTaken) {
      seatToTry = planeLayout.findRandomSeat();
      seatTaken = planeLayout.isSeatTaken(seatToTry, this.travelers);
    }
    this.travelers.push(seatToTry);
  }
};
