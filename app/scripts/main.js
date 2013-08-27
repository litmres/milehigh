!function() {
  var game = new function game()  {
    var board = document.createElement('div'),
        setup = !function setup() {
          board.id = 'game';
          document.body.appendChild(board);
        }();

    function makeEmptySeat() {
      var el = document.createElement('span');
      el.innerHTML = '[ ]';
      return el; 
    }

    function makeFullSeat() {
      var el = makeEmptySeat();
      el.innerHTML = '[x]';
      return el;
    }

    function makeRandomSeat() {
      if (Math.floor(Math.random() * 2)) {
        return makeFullSeat();
      } else {
        return makeEmptySeat();
      }
    }

    this.start = function start() {
      var empty, full = document.createElement('span'),
          seatsToDraw = 10;;
      while (seatsToDraw) {
        board.appendChild(makeRandomSeat());
        seatsToDraw--; 
      }
    };
  };
  game.start();
}();
