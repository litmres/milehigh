/*globals describe, it, expect, World */
'use strict';
(function () {
  describe('World model', function () {
    it('should initalize', function () {
      var simpleLayout = [
        '#OOOO#',
        '+OOOO#',
        '      ',
        '#OOOO#'
      ];

      var TOTAL_TRAVELERS = 4;

      var player = { x: 2, y: 3};
      var world = new World(simpleLayout, TOTAL_TRAVELERS, player);

      expect(world.planeLayout.width).to.equal(6);
      expect(world.planeLayout.planeLayout[1][0]).to.equal('+');
      expect(world.planeLayout.planeLayout[3][5]).to.equal('#');

      expect(world.travelers.length).to.equal(4);
    });
  });
})();