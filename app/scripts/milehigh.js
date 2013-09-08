/*jshint unused: false */
/*globals World,GameStats */

'use strict';

var MileHigh = function (board) {

  var TOTAL_TRAVELERS = 20;

  var seven6seven = [
    '#OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO###',
    '+OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO+#+',
    '                                       ',
    '#OOOO# OOOOOOOOOOOOOOO OOOOOOOOOOOOOO+#',
    '#OOOO# OOOOOOOOOOOOOOO OOOOOOOOOOOOOO##',
    '#OOOO# OOOOOOOOOOOOOOO OOOOOOOOOOOOOO+#',
    '                                       ',
    '+OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO+#+',
    '#OOOO# OOOOOOOOOOOOOO O OOOOOOOOOOOO###',
  ];

  var crj700 = [
    '# OOOOOOOOOOO OOOOO###',
    '# OOOOOOOOOOO OOOOO#+#',
    '                      ',
    '# OOOOOOOOOOO OOOOOOOO',
    '# OOOOOOOOOOO OOOOOOOO',
  ];

  var seven3seven = [
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO+#+',
    '                                    ',
    '+OO# OOOOOOOOOOO O OOOOOOOOOOOOOO+#+',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###',
    '#OO# OOOOOOOOOOO O OOOOOOOOOOOOOO###'
  ];
  this.player = this.initPlayer();
  this.world = new World(seven6seven, TOTAL_TRAVELERS, this.player);
  if (window.AudioContext) {
    this.audio = this.initAudio();
  }
  this.controls = this.initControls(this.player, board);
  this.gameStats = new GameStats();
  this.initObstacles();
};

/**
 * Rendering hooks for moving the world
 */
MileHigh.prototype.beginRendering = function (ctx, width, height) {
    ctx.save();

    if (this.world.currentObstacle === World.Obstacle.TURBULENCE) {
        var r1 = Math.random(), r2 = Math.random(), off1 = r1 * 10, off2 = r2 * 10;
        this.jiggleX = (r1 * 10) % 2 === 0 ? -off1 : off1;
        this.jiggleY = (r2 * 10) % 2 === 0 ? -off2 : off2;

        ctx.translate(this.jiggleX, this.jiggleY);
    } else {
        ctx.clearRect(0, 0, width, height);
    }
};

MileHigh.prototype.endRendering = function (ctx) {
    ctx.translate(-this.jiggleX, -this.jiggleY);
    ctx.restore();
};
