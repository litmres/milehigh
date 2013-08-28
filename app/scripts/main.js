!function() {
  var game = new function game()  {
    var board = document.createElement('canvas'),
        ctx = board.getContext('2d'),
        setup = !function setup() {
          board.width = '980';
          board.height = '400';
          document.body.appendChild(board);
        }();

    function renderSeat() {
      ctx.fillRect(Math.floor(Math.random() * 880), (Math.random() * 380),20,20);
    }

    function makeEmptySeat() {
      ctx.fillStyle="#0F0";
    }

    function makeFullSeat() {
      ctx.fillStyle="#080";
    }

    function makeRandomSeat() {
      if (Math.floor(Math.random() * 2)) {
        makeFullSeat();
      } else {
        makeEmptySeat();
      }
      renderSeat();
    }

    function tick() {
      ctx.clearRect(0, 0, board.width, board.height);
      var seatsToDraw = 100;
      while (seatsToDraw) {
        makeRandomSeat();
        seatsToDraw--; 
      }
    }

    function loop() {
      requestAnimationFrame(loop);
      tick();
    }

    this.start = function start() {
      loop();
    };
  };
  game.start();
}();
