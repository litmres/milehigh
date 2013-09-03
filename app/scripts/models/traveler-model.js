/*jshint unused: false */
/**
 * Traveler object
 */

'use strict';

function Traveler (id, opts) {
  opts = opts || {};
  this.id = id;
  this.x = opts.x || 0;
  this.y = opts.y || 0;
  this.heat = 0;
  this.baseHeat = Math.floor(Math.random(10));
  this.encounters = 0; // number of times in bathroom
  this.blocks = 0; // number of times bathroom encounters failed
  // other possible properties: frigidity or looseness, type: (flight
  // attendant, pilot, ...) 
}
