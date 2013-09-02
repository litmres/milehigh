/*globals describe, it, expect, MileHigh */
'use strict';
(function () {
  describe('MileHigh Game Turn', function () {

    describe('logic based on turns', function () {

      it('should initalize at turn 0', function () {
        var mileHigh = new MileHigh();
        expect(mileHigh.turn).to.equal(0);
      });

    });

    describe('calculation based on Date()', function () {

      it('should be turn 1 at 1 second', function () {
        var mileHigh = new MileHigh();
        mileHigh.initialDate = new Date('3/17/2013 8:00:00');
        mileHigh.nextTurn(new Date('3/17/2013 8:00:01'));
        expect(mileHigh.turn).to.equal(1);
      });

    });
  });
})();