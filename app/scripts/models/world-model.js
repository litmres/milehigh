/*globals PlaneLayout */
/*
  Model layer that answers questions about the plane layout, travelers and main player.
*/
'use strict';

function World(planeLayoutIn, totalTravelers, player) {
  this.planeLayout = new PlaneLayout(planeLayoutIn);
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

/*
  If at edge of board, return false, otherwise is the space next to me somewhere I can move
  and is the space available to be moved into?
*/
World.prototype.spaceNotAvailableToMoveTo = function (currentLocation, locationToCheck) {
  var x = locationToCheck.x,
    y = locationToCheck.y;

  // make sure map square is valid to move to (prior to checking if anyone else is actually there)
  if (this.planeLayout.isLocationUnMoveable(currentLocation, {x: x, y: y})) {
    return true;
  }

  // make sure no travelers are there
  for (var traveler = 0; traveler < this.travelers.length; traveler++) {
    if ((x === this.travelers[traveler].x) && (y === this.travelers[traveler].y)) {
      return true;
    }
  }

  return false;
};

World.prototype.canIMoveLeft = function () {
  var currentLocation = {x: this.player.x, y: this.player.y};
  if (this.planeLayout.atLeftEdge(currentLocation)) {
    return false;
  }
  if (this.spaceNotAvailableToMoveTo(currentLocation, {x: currentLocation.x - 1, y: currentLocation.y})) {
    return false;
  }
  return true;
};

World.prototype.canIMoveRight = function () {
  var currentLocation = {x: this.player.x, y: this.player.y};
  if (this.planeLayout.atRightEdge(currentLocation)) {
    return false;
  }
  if (this.spaceNotAvailableToMoveTo(currentLocation, {x: currentLocation.x + 1, y: currentLocation.y})) {
    return false;
  }
  return true;
};

World.prototype.canIMoveUp = function () {
  var currentLocation = {x: this.player.x, y: this.player.y};
  if (this.planeLayout.atTopEdge(currentLocation)) {
    return false;
  }
  if (this.spaceNotAvailableToMoveTo(currentLocation, {x: currentLocation.x, y: currentLocation.y - 1})) {
    return false;
  }
  return true;
};

World.prototype.canIMoveDown = function () {
  var currentLocation = {x: this.player.x, y: this.player.y};
  if (this.planeLayout.atBottomEdge(currentLocation)) {
    return false;
  }
  if (this.spaceNotAvailableToMoveTo(currentLocation, {x: currentLocation.x, y: currentLocation.y + 1})) {
    return false;
  }
  return true;
};
