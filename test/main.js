require.config({
  paths: {
    chai: 'bower_components/chai/chai'
  },
  shim: {
  }
});

require(['chai'], function (chai) {
  'use strict';

  mocha.setup('bdd');

  window.expect = chai.expect

  require([
    'spec/test'
  ], mocha.run);
});
