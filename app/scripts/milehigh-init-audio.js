/*globals MileHigh,AudioContext */
/*jshint unused: false */
'use strict';

MileHigh.prototype.initAudio = function () {
  var world = this.world,
      actx = new AudioContext(),
      freq,
      osc,
      amp = null;

  function makeCustomSine() {
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

  function makeCustomSquare() {
    var length = 10,
        square = new Float32Array(length),
        i = null;
    for (i = 0; i < square.length; i++) {
      square[i] = i % 2;
    }
    return actx.createWaveTable(square, square);
  }
  
  function setOscType(type) {
    if (type === 'CustomSine') {
      osc.setWaveTable(makeCustomSine());
    } else if (type === 'CustomSquare') {
      osc.setWaveTable(makeCustomSquare());
    } else if (type === 'Sine') {
      osc.type = 0;
    } else if (type === 'Square') {
      osc.type = 1;
    } else if (type === 'Sawtooth') {
      osc.type = 2;
    } else if (type === 'Triangle') {
      osc.type = 3;
    }
  }

  function setVol(vol) {
    amp.gain.value = vol;
  }

  function setFreq(freq) {
    osc.frequency.value = freq;
  }

  function stopAudio() {
    osc.noteOff(0);
  }

  function startAudio() {
    osc.noteOn(0);
  }

  function makeAudio(type, freq, vol) {
    if (osc) {
      stopAudio();
    }
    osc = actx.createOscillator();
    setOscType(type);
    setFreq(freq);
    amp = actx.createGainNode();
    setVol(vol);
    osc.connect(amp);
    amp.connect(actx.destination);
    startAudio();
  }

  function playAudioSeatBelts() {
    makeAudio('CustomSquare', 587.33, 0.8);
    setTimeout(function() {
      setFreq(493.88);
      setTimeout(stopAudio, 500);
    }, 500);
  }

  function playAudioWhistle() {
    makeAudio('CustomSine', 800, 0.8);
    setTimeout(function() {
      setFreq(1200);
      setTimeout(function() {
        stopAudio();
        setTimeout(function() {
          makeAudio('CustomSine', 800, 0.8);
          setTimeout(function() {
            setFreq(1000);
            setTimeout(function() {
              setFreq(800);
              setTimeout(function() {
                stopAudio();
              }, 400);
            }, 200);
          }, 200);
        }, 100);
      }, 200);
    }, 400);
  }

  function playAudioPlayerMove() {
    makeAudio('Square', 98, 0.4);
    setTimeout(stopAudio, 30);
  }

  function playAudio(e) {
    if (e.detail === 'seatBelts') {
      playAudioSeatBelts();
    }
    if (e.detail === 'whistle') {
      playAudioWhistle();
    }
    if (e.detail === 'playerMove') {
      playAudioPlayerMove();
    }
  }

  addEventListener('audio', playAudio, false);
};

