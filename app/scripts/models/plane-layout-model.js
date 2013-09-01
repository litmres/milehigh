/*
  PlaneLayout model
  */
'use strict';

function PlaneLayout(planeLayoutIn) {
  var planeLayout = [],
    firstRowLength = 0;

  for (var i=0; i < planeLayoutIn.length; i++) {
    if (i === 0) { firstRowLength = planeLayoutIn[i].length; }
    if (firstRowLength !== planeLayoutIn[i].length) {
      throw new Error('initPlaneLayout: Rows are not all the same length.');
    }
    planeLayout.push(planeLayoutIn[i].split(''));
  }

  this.planeLayout = planeLayout;
  this.width = firstRowLength;
  this.height = planeLayout.length;
}

PlaneLayout.prototype.arrayForRender = function () {
  return this.planeLayout;
};

/* Find any seat, whether occupied or not */
PlaneLayout.prototype.findRandomSeat = function () {
  var row,
    col,
    totalRows = this.planeLayout.length,
    totalCols = this.planeLayout[0].length;

  while (true) {
    row = Math.floor((Math.random()*totalRows));
    col = Math.floor((Math.random()*totalCols));
    if (this.planeLayout[row][col] === 'O') {
      return { x: col, y: row };
    }
  }
};

/*
  Return true if seat is in arrayOfExistingSeats.

  A seat is in this format: {x: 1, y: 2}
  */
PlaneLayout.prototype.isSeatTaken = function (seat, arrayOfExistingSeats) {

  for (var t=0; t < arrayOfExistingSeats.length; t++) {
    if ((seat.y === arrayOfExistingSeats[t].y) && (seat.x === arrayOfExistingSeats[t].x)) {
      return true;
    }
  }
};

PlaneLayout.prototype.isLocationUnMoveable = function (locationToCheck) {
  var x = locationToCheck.x,
    y = locationToCheck.y;

  switch (this.planeLayout[y][x]) {
  case 'O':
    return false;
  case ' ':
    return false;
  case '+':
    return false;
  default:
    return true;
  }
};

PlaneLayout.prototype.atLeftEdge = function (currentLocation) {
  return (currentLocation.x === 0);
};

PlaneLayout.prototype.atRightEdge = function (currentLocation) {
  return (currentLocation.x === this.width - 1);
};

PlaneLayout.prototype.atTopEdge = function (currentLocation) {
  return (currentLocation.y === 0);
};

PlaneLayout.prototype.atBottomEdge = function (currentLocation) {
  return (currentLocation.y === this.height - 1);
};