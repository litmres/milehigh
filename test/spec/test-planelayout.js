/*globals describe, it, expect, PlaneLayout */
'use strict';
(function () {
  describe('PlaneLayoutModel', function () {
    it('should initalize', function () {
      var simpleLayout = [
        '#OOOO#',
        '+OOOO#',
        '      ',
        '#OOOO#'
      ];
      var planeLayout = new PlaneLayout(simpleLayout);

      expect(planeLayout.width).to.equal(6);
      expect(planeLayout.height).to.equal(4);
      expect(planeLayout.planeLayout[1][0]).to.equal('+');
      expect(planeLayout.planeLayout[3][5]).to.equal('#');
    });
  });
})();
