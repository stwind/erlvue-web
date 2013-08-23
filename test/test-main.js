require.config({
  baseUrl: '/base/app/scripts',
  paths: {
    chai: '../bower_components/chai/chai',
    sinon: '../bower_components/sinon/index',
    'sinon-chai': '../bower_components/sinon-chai/lib/sinon-chai',
    spec: '../../test/spec'
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

  chai.use(sinonChai);

  window.expect = chai.expect
  window.sinon = sinon;

  require([
    'spec/test'
  ], function() {
     window.__karma__.start();
  });
});
