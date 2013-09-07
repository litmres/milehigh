/*globals MileHigh,World */
'use strict';

/**
 * Obstacles implementation
 */
MileHigh.prototype.initObstacles = function () {
    // Allows for a minimum threshold
    this.lastTurbulenceAt = null;
    this.lastSnackAt = null;

    // These can adapt to difficulty and number of players on board
    this.turbulenceProbability = 0.05;
    this.snackProbability = 0.05;
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

MileHigh.prototype.isLanding = function () {
    // return time spent > max time
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
        return Math.random() < this.turbulenceProbability;
    }
};

MileHigh.prototype.hasSnacks = function () {
    return Math.random() < this.snackProbability;
};

MileHigh.prototype.addTurbulence = function () {
    console.log('TURBULENCE!');
    this.lastTurbulenceAt = (new Date()).getTime();

    // Update flag for renderers
    this.world.currentObstacle = World.Obstacle.TURBULENCE;

    // Play ding
    var seatbelts = new CustomEvent('audio', {detail: 'seatBelts'});
    window.dispatchEvent(seatbelts);

    // Break pairings if not getting busy
    if (this.player.state !== World.PlayerState.IN_LAVATORY) {
        this.world.findPairedTravelersARandomPlaceToSit();
        this.world.clearAllPairings();
        this.player.state = World.PlayerState.HORNY;
    }
    // Reset player heat levels
    this.world.resetTravelerHeatLevels();

};

MileHigh.prototype.removeTurbulence = function () {
    this.world.currentObstacle = null;
};
