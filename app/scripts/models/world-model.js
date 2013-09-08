/*globals PlaneLayout,Traveler */
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
  'IN_LAVATORY': 4
};

World.PAIRING_HEAT_THRESHOLD = 10;

World.prototype.initRandomTravelersAtSpecificSeats = function (totalTravelers) {
  var seatTaken,
    seatToTry,
    traveler;

  this.travelers = [];

  for (var i=0; i < totalTravelers; i++) {
    seatTaken = true;
    while (seatTaken) {
      seatToTry = this.planeLayout.findRandomSeat();
      seatTaken = this.planeLayout.isSeatTaken(seatToTry, this.travelers);
    }
    traveler = new Traveler('T' + i, seatToTry);
    // TODO: We should initialize a Traveler object or decorate the blob with random
    // traveler properties here
    this.travelers.push(traveler);
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
    if ((x === this.travelers[traveler].x) && (y === this.travelers[traveler].y) && (!this.travelers[traveler].paired)) {
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
 * Returns traveler at some location
 * @param {Object} location with x, y
 * @return {Traveler} or null 
 */
World.prototype.getTravelerAtLocation = function (location) {
  var traveler = null;

  for (var i = 0, len = this.travelers.length; i < len; i++) {
    if (this.travelers[i].x === location.x && this.travelers[i].y === location.y) {
      traveler = this.travelers[i];
      break;
    }
  }
  return traveler;
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
      testLocation = {};

  opts = opts || {};

  // Check all adjoining squares
  // OPTIMIZATION: Perhaps walking travelers array would be faster?
  for (var x = -1; x <= 1; x++) {
    testLocation.x = currentLocation.x + x;

    for (var y = -1; y <= 1; y++) {
      testLocation.y = currentLocation.y + y;

      if (this.planeLayout.isLocationASeat(testLocation) && this.planeLayout.isSeatTaken(testLocation, this.travelers)) {

        near.push(this.getTravelerAtLocation(testLocation));

        if (opts.breakOnMatch) {
          break;
        }
      }
    }
  }
  return near;
};

/**
 * Updates all traveler 'heat' levels
 * @param {Array} flirting List of currently flirting travelers
 */
World.prototype.updateTravelerHeatLevels = function (flirting) {
  var found;

  for (var i = 0, len = this.travelers.length; i < len; i++) {
    found = false;

    // lookup matching traveler by id
    for (var j = 0; j < flirting.length; j++) {
      if (flirting[j].id === this.travelers[i].id) {
        found = true;
        break;
      }
    }
    if (found) {
      this.travelers[i].heat += 1;
    } else {
      this.travelers[i].heat = 0;
    }
  }
};

World.prototype.resetTravelerHeatLevels = function () {
  for (var i = 0, len = this.travelers.length; i < len; i++) {
    this.travelers[i].heat = 0;
  }
};

/**
 * Return array of travelers ready to pair (since there may be more than one)
 */
World.prototype.travelersReadyToPair = function (flirting) {
  var pairsFound = [];

  for (var i = 0, len = this.travelers.length; i < len; i++) {
    // lookup matching traveler by id
    for (var j = 0; j < flirting.length; j++) {
      if (flirting[j].id === this.travelers[i].id) {
        if (this.travelers[i].heat >= World.PAIRING_HEAT_THRESHOLD) {
          pairsFound.push(this.travelers[i]);
        }
      }
    }
  }
  return pairsFound;
};

/**
 * Return all the travelers marked as "paired".
 *
 */
World.prototype.pairedTravelers = function () {
    return this.travelers.filter(function (traveler) {
      return traveler.paired;
    });
  };

/**
 * Return true if player is in the bathroom
 * @return {boolean}
 */
World.prototype.playerInLavatory = function () {
  if (this.planeLayout.isLocationALavatory(this.player)) {
    return true;
  }
  return false;
};

World.prototype.findPairedTravelersARandomPlaceToSit = function () {
  var pairedTravelers = this.pairedTravelers(),
    seatToTry,
    seatTaken,
    planeLayout = this.planeLayout,
    travelers = this.travelers;
  pairedTravelers.forEach(function (traveler) {
    seatTaken = true;
    while (seatTaken) {
      seatToTry = planeLayout.findRandomSeat();
      seatTaken = planeLayout.isSeatTaken(seatToTry, travelers);
    }
    traveler.x = seatToTry.x;
    traveler.y = seatToTry.y;
  });
};

World.prototype.clearAllPairings = function () {
  this.travelers.forEach(function (traveler) {
    traveler.unpair();
  });
};
