/*globals MileHigh */
/*jshint unused: false */
'use strict';

MileHigh.prototype.initAudio = function () {
  var world = this.world,
      actx = new AudioContext(),
      freq = 100,
      osc,
      amp = null;

  function makeSine() {
    var sineLength = 10,
        sine1 = new Float32Array(sineLength),
        sine2 = new Float32Array(sineLength),
        i = null;
    for (i = 0; i < sineLength; i++) {
      sine1[i] = Math.sin(Math.PI * i / sineLength);
    } 
    for (i = 0; i < sineLength; i++) {
      sine2[i] = Math.cos(Math.PI * i / sineLength); 
    }
    return actx.createWaveTable(sine1, sine2);
  }

  function makeSquare() {
    var length = 10,
        square = new Float32Array(length),
        i = null;
    for (i = 0; i < square.length; i++) {
      square[i] = i % 2;
    }
    return actx.createWaveTable(square, square);
  }
 
  function stopAudio() {
    osc.noteOff(0);
  };

  function playAudio(e) {
    osc = actx.createOscillator(),
    amp = actx.createGainNode(); 
    osc.setWaveTable(makeSquare()); 
    osc.frequency.value = freq;
    osc.connect(amp);
    amp.connect(actx.destination);

    osc.noteOn(0);
    amp.gain.value = 1;
    setTimeout(stopAudio, 30);
  }


  addEventListener('playerMove', playAudio, false);
};

