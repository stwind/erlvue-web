require.config({
  paths: {
    chai: 'bower_components/chai/chai',
    sinon: 'bower_components/sinon/index'
  },
  shim: {
    sinon: { exports: 'sinon' }
  }
});

require(['chai', 'sinon'], function (chai, sinon) {
  'use strict';

  mocha.setup('bdd');

  window.expect = chai.expect
  window.sinon = sinon;

  require([
    'spec/test'
  ], mocha.run);
});
