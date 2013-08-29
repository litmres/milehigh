/*globals MileHigh */
/*jshint unused: false */
'use strict';

/*
  Convert human-readable planeLayoutIn into a true 2-dimensional array of
  characters.
*/
MileHigh.prototype.initPlaneLayout = function (planeLayoutIn) {
	var planeLayout = [],
    firstRowLength = 0;

  for (var i=0; i < planeLayoutIn.length; i++) {
    if (i === 0) { firstRowLength = planeLayoutIn[i].length; }
    if (firstRowLength !== planeLayoutIn[i].length) {
      throw new Error('initPlaneLayout: Rows are not all the same length.');
    }
    planeLayout.push(planeLayoutIn[i].split(''));
  }

  return planeLayout;
};
