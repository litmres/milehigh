/*globals PlaneLayout */
/*
  Model layer that answers questions about the plane layout, travelers and main player.
*/
'use strict';

function World(planeLayoutIn, totalTravelers, player) {
  this.planeLayout = new PlaneLayout(planeLayoutIn);
  this.initRandomTravelersAtSpecificSeats(totalTravelers);
  this.player = player;
  this.player.state = World.PlayerState.HORNY; // a player's natural state
}

/**
 * All possible states for a player.  We'll keep a flag to one of these
 * values on the player object
 */
World.PlayerState = {
  'HORNY': 1,
  'FLIRTING': 2,
  'PAIRED': 3,
  'IN_BATHROOM': 4
};

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

/**
 * Checks if player is near a traveler for flirting.  Returns array of matches
 * @param {Object} opts
 *   {Boolean} breakOnMatch return after 1st match
 * @return {Array}
 */
World.prototype.getNearbyTravelers = function (opts) {
  var near = [],
      currentLocation = {x: this.player.x, y: this.player.y},
      testLocation = {}, 
      cx, cy;

  opts = opts || {};

  // Check all adjoining squares
  // OPTIMIZATION: Perhaps walking travelers array would be faster?
  for (var x = -1; x <= 1; x++) {
    testLocation.x = currentLocation.x + x;

    for (var y = -1; y <= 1; y++) {
      testLocation.y = currentLocation.y + y;

      if (this.planeLayout.isLocationASeat(testLocation) && this.planeLayout.isSeatTaken(testLocation, this.travelers)) {
        near.push({x: testLocation.x, y: testLocation.y});
        if (opts.breakOnMatch) {
          break;
        }
      }
    }
  }
  return near;
};
