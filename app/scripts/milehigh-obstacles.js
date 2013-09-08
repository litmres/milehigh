/*globals MileHigh,World */
'use strict';

MileHigh.prototype.maxTurns = 200;

/**
 * Obstacles implementation
 */
MileHigh.prototype.initObstacles = function () {
  // Allows for a minimum threshold
  this.lastTurbulenceAt = null;
  this.lastSnackAt = null;

  // These can adapt to difficulty and number of players on board
  this.turbulenceProbability = 0.02;
  this.snackProbability = 0.04;
};

/**
 * Returns obstacle at current turn, null if none
 */
MileHigh.prototype.getObstacle = function () {
  // Landing?
  if (this.isLanding()) {
    return World.Obstacle.LANDING; // game over
  }
  // Terrorist?
  // Turbulence?
  if (this.hasTurbulence()) {
    return World.Obstacle.TURBULENCE;
  }
  // Food/Drink time?
  if (this.hasSnacks()) {
    return World.Obstacle.SNACKS;
  }
  return null;
};

MileHigh.prototype.obstacleInProgress = function () {
  if (this.world.currentObstacle) {
    return true;
  }
  return false;
};

MileHigh.prototype.isLanding = function () {
  if (this.obstacleInProgress()) {
    return false;
  }
  // return time spent > max time
  if (this.gameStats.turns >= this.maxTurns) {
    return true;
  }
  return false;
};

MileHigh.prototype.hasTurbulence = function () {
  if (this.world.currentObstacle === World.Obstacle.TURBULENCE) {
    // for up to 5 seconds
    if (((new Date()).getTime() - this.lastTurbulenceAt) > (Math.floor(Math.random() * 5))) {
      this.removeTurbulence();
      return false;
    }
  } else {
    if (this.obstacleInProgress()) {
      return false;
    }
    return Math.random() < this.turbulenceProbability;
  }
};

MileHigh.prototype.hasSnacks = function () {
  if (this.obstacleInProgress()) {
    return false;
  }
  return Math.random() < this.snackProbability;
};

MileHigh.prototype.gameOver = function () {
  this.world.currentObstacle = World.Obstacle.LANDING;
};

MileHigh.prototype.addTurbulence = function () {
  console.log('TURBULENCE!');
  document.getElementById('turbulence-alert').classList.remove('hide');

  this.lastTurbulenceAt = (new Date()).getTime();

  // Update flag for renderers
  this.world.currentObstacle = World.Obstacle.TURBULENCE;

    // Break pairings if not getting busy
    if (this.player.state !== World.PlayerState.IN_LAVATORY) {
        this.resetPlayerState();
    }
    // Reset player heat levels
    this.world.resetTravelerHeatLevels();
    //
  // Play ding
  var seatbelts = new CustomEvent('audio', {detail: 'seatBelts'});
  window.dispatchEvent(seatbelts);
};

MileHigh.prototype.removeTurbulence = function () {
  document.getElementById('turbulence-alert').classList.add('hide');
  this.world.currentObstacle = null;
};
