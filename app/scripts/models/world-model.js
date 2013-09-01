/*globals PlaneLayout */
/*
  Model layer that answers questions about the plane layout, travelers and main player.
*/
'use strict';

function World(planeLayoutIn, totalTravelers, player) {
  var layout = new PlaneLayout();
  layout.initLayout(planeLayoutIn);
  this.planeLayout = layout;

  this.initRandomTravelersAtSpecificSeats(totalTravelers);
  this.player = player;
}

World.prototype.initRandomTravelersAtSpecificSeats = function (totalTravelers) {

  var seatTaken,
    seatToTry;

  this.travelers = [];

  for (var traveler=0; traveler < totalTravelers; traveler++) {
    seatTaken = true;
    while (seatTaken) {
      seatToTry = this.planeLayout.findRandomSeat();
      seatTaken = this.planeLayout.isSeatTaken(seatToTry, this.travelers);
    }
    this.travelers.push(seatToTry);
  }
};
