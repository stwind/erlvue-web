require.config({
  paths: {
    chai: 'bower_components/chai/chai',
    sinon: 'bower_components/sinon/index',
    'sinon-chai': 'bower_components/sinon-chai/lib/sinon-chai'
  },
  shim: {
    sinon: { exports: 'sinon' }
  }
});

require([
  'chai', 
  'sinon',
  'sinon-chai'
], function (chai, sinon, sinonChai) {
  'use strict';

  mocha.setup('bdd');

  chai.use(sinonChai);

  window.expect = chai.expect
  window.sinon = sinon;

  require([
    'spec/test'
  ], mocha.run);
});
