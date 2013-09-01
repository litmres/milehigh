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
      return { row: row, col: col };
    }
  }
};

/*
  Return true if seat is in arrayOfExistingSeats.

  A seat is in this format: { row: 1, col: 2 }
  */
PlaneLayout.prototype.isSeatTaken = function (seat, arrayOfExistingSeats) {

  for (var t=0; t < arrayOfExistingSeats.length; t++) {
    if ((seat.row === arrayOfExistingSeats[t].row) && (seat.col === arrayOfExistingSeats[t].col)) {
      return true;
    }
  }
};

/*
  TODO:
    If at edge of board, return false, otherwise is the space next to me somewhere I can move
    and is the space available to be moved into?

  location is { row: 1, col: 2 }
*/
PlaneLayout.prototype.canIMoveLeft = function (location) {
  console.log(location);
  return true;
};

PlaneLayout.prototype.canIMoveRight = function (location) {
  console.log(location);
  return true;
};

PlaneLayout.prototype.canIMoveUp = function (location) {
  console.log(location);
  return true;
};

PlaneLayout.prototype.canIMoveDown = function (location) {
  console.log(location);
  return true;
};
