/*globals MileHigh, PlaneLayout */
/*jshint unused: false */
'use strict';

/*
  Factory that creates a PlaneLayout model from a human-readable planeLayoutIn array.
*/
MileHigh.prototype.initPlaneLayout = function (planeLayoutIn) {
  var layout = new PlaneLayout();
  layout.initLayout(planeLayoutIn);
  return layout;
};
